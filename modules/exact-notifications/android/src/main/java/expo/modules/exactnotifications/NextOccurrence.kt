package expo.modules.exactnotifications

import java.util.Calendar
import java.util.TimeZone

/**
 * Recurrence math mirroring the app's display semantics
 * (`src/utils/date-time-display.ts`): daily -> +1 day, weekly -> +1 week (same
 * weekday), monthly -> +1 month, yearly -> +1 year.
 *
 * Every occurrence is computed from the original `anchor` (n units after it),
 * never from the previous occurrence. Stepping from the previous one would
 * drift: Jan 31 -> Feb 28 -> Mar 28 instead of Mar 31.
 */
object NextOccurrence {
  private const val MAX_STEPS = 200_000

  /** The n-th occurrence after [anchor], in wall-clock terms of [tz]. */
  fun occurrence(anchor: Long, repeat: String, n: Int, tz: TimeZone): Long {
    val cal = Calendar.getInstance(tz).apply { timeInMillis = anchor }
    when (repeat) {
      "daily" -> cal.add(Calendar.DAY_OF_MONTH, n)
      "weekly" -> cal.add(Calendar.WEEK_OF_YEAR, n)
      "monthly" -> cal.add(Calendar.MONTH, n)
      "yearly" -> cal.add(Calendar.YEAR, n)
      else -> return anchor
    }
    return cal.timeInMillis
  }

  /** The first occurrence strictly after [after]. One-shots return [anchor]. */
  fun nextAfter(anchor: Long, repeat: String, after: Long, tz: TimeZone): Long {
    if (repeat == "none") return anchor
    var n = 0
    var t = anchor
    while (t <= after && n < MAX_STEPS) {
      n++
      t = occurrence(anchor, repeat, n, tz)
    }
    return t
  }

  /**
   * Re-expresses an instant so it shows the same wall-clock time in [to] that it
   * showed in [from]. Used after a timezone change so "8:00 AM" stays 8:00 AM.
   */
  fun convertZone(millis: Long, from: TimeZone, to: TimeZone): Long {
    val src = Calendar.getInstance(from).apply { timeInMillis = millis }
    val dst = Calendar.getInstance(to)
    dst.clear()
    dst.set(
      src.get(Calendar.YEAR),
      src.get(Calendar.MONTH),
      src.get(Calendar.DAY_OF_MONTH),
      src.get(Calendar.HOUR_OF_DAY),
      src.get(Calendar.MINUTE),
      src.get(Calendar.SECOND),
    )
    return dst.timeInMillis
  }
}
