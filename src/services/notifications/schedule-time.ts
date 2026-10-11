import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DEFAULT_DATE_FORMAT } from "@/components/react-hook-form/rhf-date-picker/rhf-date-picker.utils";
import type { INotification, RepeatType } from "@/store";

dayjs.extend(customParseFormat);

// Matches the formats the form persists: date "DD / MM / YYYY", time "hh:mm A".
const TIME_FORMAT = "hh:mm A";
const DATETIME_FORMAT = `${DEFAULT_DATE_FORMAT} ${TIME_FORMAT}`;

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

function advance(d: Dayjs, repeat: RepeatType): Dayjs {
  switch (repeat) {
    case "daily":
      return d.add(1, "day");
    case "weekly":
      return d.add(1, "week");
    case "monthly":
      return d.add(1, "month");
    case "yearly":
      return d.add(1, "year");
    default:
      return d;
  }
}

/**
 * Resolves the next absolute fire time (epoch ms) for a notification.
 * - One-shot in the past → `null` (nothing to schedule).
 * - Repeating in the past → rolled forward to the next future occurrence,
 *   mirroring `formatNotificationDateTime` recurrence semantics.
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

  let next = base;
  while (!next.isAfter(now)) {
    next = advance(next, notification.repeat);
  }
  return next.valueOf();
}
