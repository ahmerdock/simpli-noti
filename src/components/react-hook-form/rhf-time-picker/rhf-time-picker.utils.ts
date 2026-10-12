export const DEFAULT_PLACEHOLDER = "HH:MM AM";
export const DEFAULT_MODAL_TITLE = "Select Time";

const TIME_VALUE_REGEX = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;

export const DEFAULT_HOUR = "12";
export const DEFAULT_MINUTE = "00";
export const DEFAULT_PERIOD = "AM";

export const buildTimeValue = (hour: string, minute: string, period: string) =>
  `${hour}:${minute} ${period}`;

export const parseTimeValue = (value: string) => {
  const match = value.match(TIME_VALUE_REGEX);
  if (!match) return null;

  return {
    hour: match[1].padStart(2, "0"),
    minute: match[2],
    period: match[3].toUpperCase(),
  };
};

export const isValidTimeValue = (value: unknown): value is string =>
  typeof value === "string" && TIME_VALUE_REGEX.test(value);
