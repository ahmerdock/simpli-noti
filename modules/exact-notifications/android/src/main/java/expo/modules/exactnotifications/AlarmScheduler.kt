package expo.modules.exactnotifications

import android.app.AlarmManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build

/**
 * Arms/cancels exact alarms. Uses [AlarmManager.setAlarmClock] — the strongest
 * scheduling primitive: it fires at the exact time even in Doze and is exempt
 * from the Android 12+ exact-alarm permission gate (we still declare
 * USE_EXACT_ALARM for the fallback path). Only the id travels in the
 * PendingIntent; the delivery receiver reads the latest data from
 * [ScheduleStore] so edits/cancellations can't deliver stale content.
 */
object AlarmScheduler {
  const val EXTRA_ID = "id"

  fun arm(context: Context, item: ScheduledItem) {
    val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
    val operation = deliveryPendingIntent(context, item.id)

    try {
      val info = AlarmManager.AlarmClockInfo(item.triggerAtMillis, launchPendingIntent(context))
      alarmManager.setAlarmClock(info, operation)
    } catch (e: SecurityException) {
      // Defensive fallback; setAlarmClock should never require the permission.
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
        alarmManager.setExactAndAllowWhileIdle(
          AlarmManager.RTC_WAKEUP,
          item.triggerAtMillis,
          operation,
        )
      } else {
        alarmManager.setExact(AlarmManager.RTC_WAKEUP, item.triggerAtMillis, operation)
      }
    }
  }

  fun cancel(context: Context, id: String) {
    val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
    alarmManager.cancel(deliveryPendingIntent(context, id))
  }

  /** PendingIntent equality ignores extras, so id in the request code keeps each distinct. */
  private fun deliveryPendingIntent(context: Context, id: String): PendingIntent {
    val intent =
      Intent(context, NotificationDeliveryReceiver::class.java).apply {
        action = "$ACTION_DELIVER.$id"
        putExtra(EXTRA_ID, id)
      }
    return PendingIntent.getBroadcast(context, id.hashCode(), intent, pendingIntentFlags())
  }

  fun launchPendingIntent(context: Context): PendingIntent {
    val launch =
      context.packageManager.getLaunchIntentForPackage(context.packageName)
        ?: Intent()
    return PendingIntent.getActivity(context, 0, launch, pendingIntentFlags())
  }

  private fun pendingIntentFlags(): Int {
    var flags = PendingIntent.FLAG_UPDATE_CURRENT
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      flags = flags or PendingIntent.FLAG_IMMUTABLE
    }
    return flags
  }

  private const val ACTION_DELIVER = "expo.modules.exactnotifications.DELIVER"
}
