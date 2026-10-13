package expo.modules.exactnotifications

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.core.content.ContextCompat

object NotificationPresenter {
  fun post(context: Context, item: ScheduledItem) {
    if (!canPost(context)) return
    NotificationChannels.ensure(context)

    val builder =
      NotificationCompat.Builder(context, NotificationChannels.CHANNEL_ID)
        .setSmallIcon(R.drawable.ic_notification)
        .setContentTitle(item.title.ifBlank { context.applicationInfo.loadLabel(context.packageManager).toString() })
        .setPriority(NotificationCompat.PRIORITY_HIGH)
        .setCategory(NotificationCompat.CATEGORY_REMINDER)
        .setAutoCancel(true)
        .setContentIntent(AlarmScheduler.launchPendingIntent(context))

    if (item.body.isNotBlank()) {
      builder
        .setContentText(item.body)
        .setStyle(NotificationCompat.BigTextStyle().bigText(item.body))
    }

    try {
      NotificationManagerCompat.from(context).notify(item.id.hashCode(), builder.build())
    } catch (e: SecurityException) {
      // POST_NOTIFICATIONS revoked between the check and notify — ignore.
    }
  }

  private fun canPost(context: Context): Boolean {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) return true
    return ContextCompat.checkSelfPermission(context, Manifest.permission.POST_NOTIFICATIONS) ==
      PackageManager.PERMISSION_GRANTED
  }
}
