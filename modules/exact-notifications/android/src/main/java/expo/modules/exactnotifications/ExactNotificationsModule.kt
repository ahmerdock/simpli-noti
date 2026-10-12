package expo.modules.exactnotifications

import android.Manifest
import android.content.ActivityNotFoundException
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.provider.Settings
import androidx.core.app.NotificationManagerCompat
import androidx.core.content.ContextCompat
import expo.modules.interfaces.permissions.PermissionsResponse
import expo.modules.interfaces.permissions.PermissionsStatus
import expo.modules.kotlin.Promise
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

class ScheduleRecord : Record {
  @Field val id: String = ""
  @Field val title: String = ""
  @Field val body: String = ""
  @Field val triggerAtMillis: Double = 0.0
  @Field val repeat: String = "none"
  @Field val anchorMillis: Double = 0.0

  fun toItem(): ScheduledItem =
    ScheduledItem(
      id = id,
      title = title,
      body = body,
      triggerAtMillis = triggerAtMillis.toLong(),
      repeat = repeat,
      anchorMillis = if (anchorMillis > 0) anchorMillis.toLong() else triggerAtMillis.toLong(),
    )
}

class ExactNotificationsModule : Module() {
  private val context: Context
    get() = appContext.reactContext?.applicationContext ?: throw Exceptions.ReactContextLost()

  override fun definition() =
    ModuleDefinition {
      Name("ExactNotifications")

      AsyncFunction("ensureChannel") { NotificationChannels.ensure(context) }

      AsyncFunction("getPermissionStatus") { currentPermissionStatus() }

      AsyncFunction("requestPermission") { promise: Promise ->
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) {
          promise.resolve("granted")
          return@AsyncFunction
        }
        val permissions = appContext.permissions
        if (permissions == null) {
          promise.resolve("denied")
          return@AsyncFunction
        }
        permissions.askForPermissions(
          { result ->
            val status = result[Manifest.permission.POST_NOTIFICATIONS]?.status
            promise.resolve(
              when (status) {
                PermissionsStatus.GRANTED -> "granted"
                PermissionsStatus.UNDETERMINED -> "undetermined"
                else -> "denied"
              },
            )
          },
          Manifest.permission.POST_NOTIFICATIONS,
        )
      }

      AsyncFunction("schedule") { record: ScheduleRecord ->
        NotificationChannels.ensure(context)
        val store = ScheduleStore(context)
        var item = record.toItem()
        // A foreground re-sync can race an alarm that just fired and advanced
        // itself. For the same schedule, never move the next fire time backwards.
        val existing = store.get(item.id)
        if (
          existing != null &&
            item.repeat != "none" &&
            existing.repeat == item.repeat &&
            existing.anchorMillis == item.anchorMillis &&
            existing.triggerAtMillis > System.currentTimeMillis() &&
            item.triggerAtMillis < existing.triggerAtMillis
        ) {
          item = item.copy(triggerAtMillis = existing.triggerAtMillis)
        }
        store.save(item)
        AlarmScheduler.arm(context, item)
      }

      // `clearDelivered` defaults to true; pass false to keep an already-posted
      // notification in the tray (e.g. a one-shot that has simply fired).
      AsyncFunction("cancel") { id: String, clearDelivered: Boolean? ->
        ScheduleStore(context).remove(id)
        AlarmScheduler.cancel(context, id)
        if (clearDelivered != false) {
          NotificationManagerCompat.from(context).cancel(id.hashCode())
        }
      }

      AsyncFunction("getScheduledIds") { ScheduleStore(context).ids() }

      AsyncFunction("openBatteryOptimizationSettings") {
        // The list screen needs no special permission (unlike the direct
        // per-app exemption dialog, which Play restricts).
        val candidates =
          listOf(
            Intent(Settings.ACTION_IGNORE_BATTERY_OPTIMIZATION_SETTINGS),
            Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS).apply {
              data = Uri.parse("package:" + context.packageName)
            },
          )
        // Stop at the first screen this device can actually open.
        candidates.firstOrNull { intent ->
          try {
            context.startActivity(intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK))
            true
          } catch (e: ActivityNotFoundException) {
            false
          }
        }
        null
      }
    }

  private fun currentPermissionStatus(): String {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) return "granted"
    val granted =
      ContextCompat.checkSelfPermission(context, Manifest.permission.POST_NOTIFICATIONS) ==
        PackageManager.PERMISSION_GRANTED
    return if (granted) "granted" else "denied"
  }
}
