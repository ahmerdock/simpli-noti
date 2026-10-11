package expo.modules.exactnotifications

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import java.util.TimeZone

/**
 * Fired by AlarmManager at the scheduled time. Posts the notification and, for
 * repeating schedules, immediately re-arms the next occurrence so recurrence
 * continues without the JS app ever running.
 */
class NotificationDeliveryReceiver : BroadcastReceiver() {
  override fun onReceive(context: Context, intent: Intent) {
    val id = intent.getStringExtra(AlarmScheduler.EXTRA_ID) ?: return
    val store = ScheduleStore(context)
    // If it was canceled/deleted, the store no longer has it — deliver nothing.
    val item = store.get(id) ?: return

    NotificationPresenter.post(context, item)

    if (item.repeat == "none") {
      store.remove(id)
      return
    }

    val after = maxOf(System.currentTimeMillis(), item.triggerAtMillis)
    val next =
      NextOccurrence.nextAfter(
        item.anchorMillis,
        item.repeat,
        after,
        TimeZone.getTimeZone(item.tzId),
      )
    val updated = item.copy(triggerAtMillis = next)
    store.save(updated)
    AlarmScheduler.arm(context, updated)
  }
}
