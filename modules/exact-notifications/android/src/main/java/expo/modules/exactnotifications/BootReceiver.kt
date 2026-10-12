package expo.modules.exactnotifications

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import java.util.TimeZone

/**
 * Re-arms every persisted schedule after a reboot, app update, clock change or
 * timezone change (the OS clears alarms on restart, and alarms are absolute
 * instants). Repeating schedules whose time passed while powered off are rolled
 * forward to their next future occurrence; a missed one-shot is delivered
 * immediately (the closest we can get to its intended time) and dropped.
 * If the device timezone changed, each schedule keeps its wall-clock time
 * (8:00 AM stays 8:00 AM) in the new zone.
 */
class BootReceiver : BroadcastReceiver() {
  override fun onReceive(context: Context, intent: Intent) {
    // The receiver is exported for system broadcasts, so ignore anything else
    // another app might send to it.
    if (intent.action !in HANDLED_ACTIONS) return

    val store = ScheduleStore(context)
    val now = System.currentTimeMillis()
    val currentTz = TimeZone.getDefault()
    NotificationChannels.ensure(context)

    for (stored in store.all()) {
      val item = followTimezone(stored, currentTz)

      if (item.repeat == "none") {
        if (item.triggerAtMillis <= now) {
          NotificationPresenter.post(context, item)
          store.remove(item.id)
          AlarmScheduler.cancel(context, item.id)
        } else {
          store.save(item)
          AlarmScheduler.arm(context, item)
        }
        continue
      }

      val next =
        NextOccurrence.nextAfter(
          item.anchorMillis,
          item.repeat,
          now,
          TimeZone.getTimeZone(item.tzId),
        )
      val updated = item.copy(triggerAtMillis = next)
      store.save(updated)
      AlarmScheduler.arm(context, updated)
    }
  }

  private fun followTimezone(item: ScheduledItem, current: TimeZone): ScheduledItem {
    if (item.tzId == current.id) return item
    val from = TimeZone.getTimeZone(item.tzId)
    return item.copy(
      triggerAtMillis = NextOccurrence.convertZone(item.triggerAtMillis, from, current),
      anchorMillis = NextOccurrence.convertZone(item.anchorMillis, from, current),
      tzId = current.id,
    )
  }

  private companion object {
    val HANDLED_ACTIONS =
      setOf(
        Intent.ACTION_BOOT_COMPLETED,
        Intent.ACTION_LOCKED_BOOT_COMPLETED,
        Intent.ACTION_MY_PACKAGE_REPLACED,
        "android.intent.action.QUICKBOOT_POWERON",
        Intent.ACTION_TIMEZONE_CHANGED,
        Intent.ACTION_TIME_CHANGED,
      )
  }
}
