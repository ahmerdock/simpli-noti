package expo.modules.exactnotifications

import android.content.Context
import org.json.JSONObject

/**
 * A single armed schedule. `triggerAtMillis` is always the *next* absolute fire
 * time; for repeating schedules it is advanced after each delivery.
 */
data class ScheduledItem(
  val id: String,
  val title: String,
  val body: String,
  val triggerAtMillis: Long,
  val repeat: String,
) {
  fun toJson(): String =
    JSONObject()
      .put("id", id)
      .put("title", title)
      .put("body", body)
      .put("triggerAtMillis", triggerAtMillis)
      .put("repeat", repeat)
      .toString()

  companion object {
    fun fromJson(json: String): ScheduledItem? =
      try {
        val obj = JSONObject(json)
        ScheduledItem(
          id = obj.getString("id"),
          title = obj.optString("title"),
          body = obj.optString("body"),
          triggerAtMillis = obj.getLong("triggerAtMillis"),
          repeat = obj.optString("repeat", "none"),
        )
      } catch (e: Exception) {
        null
      }
  }
}

/**
 * Native source of truth for what is currently armed. Backed by SharedPreferences
 * so the [BootReceiver] can re-arm every schedule after the OS clears alarms on
 * reboot. Keyed by the logical notification id.
 */
class ScheduleStore(context: Context) {
  private val prefs =
    context.applicationContext.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

  fun save(item: ScheduledItem) {
    prefs.edit().putString(item.id, item.toJson()).apply()
  }

  fun get(id: String): ScheduledItem? =
    prefs.getString(id, null)?.let { ScheduledItem.fromJson(it) }

  fun remove(id: String) {
    prefs.edit().remove(id).apply()
  }

  fun clear() {
    prefs.edit().clear().apply()
  }

  fun ids(): List<String> = prefs.all.keys.toList()

  fun all(): List<ScheduledItem> =
    prefs.all.values.mapNotNull { (it as? String)?.let(ScheduledItem::fromJson) }

  companion object {
    private const val PREFS_NAME = "exact_notifications"
  }
}
