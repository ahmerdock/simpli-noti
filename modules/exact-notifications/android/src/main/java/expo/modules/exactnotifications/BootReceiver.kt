package expo.modules.exactnotifications

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent

/**
 * Re-arms every persisted schedule after a reboot or app update (the OS clears
 * all alarms on restart). Repeating schedules whose time passed while powered
 * off are rolled forward to their next future occurrence; a missed one-shot is
 * delivered immediately (the closest we can get to its intended time) and dropped.
 */
class BootReceiver : BroadcastReceiver() {
  override fun onReceive(context: Context, intent: Intent) {
    val store = ScheduleStore(context)
    val now = System.currentTimeMillis()
    NotificationChannels.ensure(context)

    for (item in store.all()) {
      if (item.repeat == "none") {
        if (item.triggerAtMillis <= now) {
          NotificationPresenter.post(context, item)
          store.remove(item.id)
        } else {
          AlarmScheduler.arm(context, item)
        }
        continue
      }

      val next = NextOccurrence.nextFuture(item.triggerAtMillis, item.repeat, now)
      val updated = if (next != item.triggerAtMillis) item.copy(triggerAtMillis = next) else item
      store.save(updated)
      AlarmScheduler.arm(context, updated)
    }
  }
}
