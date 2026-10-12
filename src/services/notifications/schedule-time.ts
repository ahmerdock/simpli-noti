import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DATETIME_FORMAT } from "@/constants/date-time";
import type { INotification } from "@/store";

dayjs.extend(customParseFormat);

/** Parses the stored display date+time into a Dayjs, or null if malformed. */
export function parseNotificationDateTime(
  notification: Pick<INotification, "date" | "time">,
): Dayjs | null {
  const parsed = dayjs(
    `${notification.date} ${notification.time}`,
    DATETIME_FORMAT,
    true,
  );
  return parsed.isValid() ? parsed.second(0).millisecond(0) : null;
}

const REPEAT_UNIT = {
  daily: "day",
  weekly: "week",
  monthly: "month",
  yearly: "year",
} as const;

function occurrence(
  base: Dayjs,
  repeat: keyof typeof REPEAT_UNIT,
  n: number,
): Dayjs {
  return base.add(n, REPEAT_UNIT[repeat]);
}

export function isInThePast(
  notification: Pick<INotification, "date" | "time">,
  now: Dayjs = dayjs(),
): boolean {
  const base = parseNotificationDateTime(notification);
  return base != null && !base.isAfter(now);
}

/**
 * Resolves the next absolute fire time (epoch ms) for a notification.
 * - One-shot in the past -> `null` (nothing to schedule).
 * - Repeating in the past -> the next future occurrence. Each occurrence is
 *   computed from the original date (not the previous occurrence), so a
 *   monthly reminder on the 31st stays on the 31st in months that have it.
 */
export function computeTriggerAt(
  notification: Pick<INotification, "date" | "time" | "repeat">,
  now: Dayjs = dayjs(),
): number | null {
  const base = parseNotificationDateTime(notification);
  if (!base) return null;

  if (notification.repeat === "none") {
    return base.isAfter(now) ? base.valueOf() : null;
  }

  // Jump close to `now` instead of stepping from the first occurrence, which
  // would take thousands of iterations for an old daily reminder.
  let n = Math.max(0, now.diff(base, REPEAT_UNIT[notification.repeat]) - 1);
  let next = occurrence(base, notification.repeat, n);
  while (!next.isAfter(now)) {
    n += 1;
    next = occurrence(base, notification.repeat, n);
  }
  return next.valueOf();
}
