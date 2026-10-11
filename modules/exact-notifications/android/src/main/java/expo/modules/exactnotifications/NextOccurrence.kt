package expo.modules.exactnotifications

import java.util.Calendar

/**
 * Recurrence math mirroring the app's display semantics
 * (`src/utils/date-time-display.ts`): daily → +1 day, weekly → +1 week (same
 * weekday), monthly → +1 month (same day-of-month, clamped for short months via
 * Calendar), yearly → +1 year. Kept in native code so repeats keep advancing
 * even when the JS app never reopens.
 */
object NextOccurrence {
  fun advance(fromMillis: Long, repeat: String): Long {
    val cal = Calendar.getInstance().apply { timeInMillis = fromMillis }
    when (repeat) {
      "daily" -> cal.add(Calendar.DAY_OF_MONTH, 1)
      "weekly" -> cal.add(Calendar.WEEK_OF_YEAR, 1)
      "monthly" -> cal.add(Calendar.MONTH, 1)
      "yearly" -> cal.add(Calendar.YEAR, 1)
      else -> return fromMillis
    }
    return cal.timeInMillis
  }

  /**
   * Rolls a fire time forward until it is strictly in the future. Used when
   * re-arming repeats after a reboot where the device was powered off across one
   * or more occurrences.
   */
  fun nextFuture(fromMillis: Long, repeat: String, now: Long): Long {
    if (repeat == "none") return fromMillis
    var t = fromMillis
    while (t <= now) t = advance(t, repeat)
    return t
  }
}
