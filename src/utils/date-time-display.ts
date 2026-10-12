import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DATE_FORMAT } from "@/constants/date-time";
import type { FormatNotificationDateTimeParams } from "./date-time-display.interface";

dayjs.extend(customParseFormat);

const parseNotificationDate = (date: string) => dayjs(date, DATE_FORMAT, true);

const formatOrdinalDay = (day: number): string => {
  const remainder = day % 100;
  if (remainder >= 11 && remainder <= 13) {
    return `${day}th`;
  }

  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
};

export const formatNotificationDateTime = ({
  date,
  time,
  repeat,
}: FormatNotificationDateTimeParams): string => {
  switch (repeat) {
    case "none":
      return `${date} • ${time}`;
    case "daily":
      return `Everyday at ${time}`;
    case "weekly": {
      const parsed = parseNotificationDate(date);
      const weekday = parsed.isValid() ? parsed.format("dddd") : date;
      return `Every ${weekday} at ${time}`;
    }
    case "monthly": {
      const parsed = parseNotificationDate(date);
      const dayOfMonth = parsed.isValid()
        ? formatOrdinalDay(parsed.date())
        : date;
      return `Every Month on ${dayOfMonth} at ${time}`;
    }
    case "yearly": {
      const parsed = parseNotificationDate(date);
      const dayAndMonth = parsed.isValid()
        ? `${formatOrdinalDay(parsed.date())} ${parsed.format("MMMM")}`
        : date;
      return `Every Year on ${dayAndMonth} at ${time}`;
    }
  }
};
