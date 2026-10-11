package expo.modules.exactnotifications

import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.os.Build

object NotificationChannels {
  const val CHANNEL_ID = "reminders"
  private const val CHANNEL_NAME = "Reminders"

  fun ensure(context: Context) {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return
    val manager = context.getSystemService(NotificationManager::class.java) ?: return
    if (manager.getNotificationChannel(CHANNEL_ID) != null) return

    val channel =
      NotificationChannel(CHANNEL_ID, CHANNEL_NAME, NotificationManager.IMPORTANCE_HIGH).apply {
        description = "Scheduled reminder notifications"
        enableVibration(true)
        enableLights(true)
      }
    manager.createNotificationChannel(channel)
  }
}
