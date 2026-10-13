import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { useUnistyles } from "react-native-unistyles";
import type { useDefaultStyles } from "react-native-ui-datepicker";

dayjs.extend(customParseFormat);

export const DEFAULT_PLACEHOLDER = "DD/MM/YY";
export const DEFAULT_MODAL_TITLE = "Select Date";

export const parseDateValue = (value: string, dateFormat: string): Dayjs => {
  if (!value) return dayjs();

  const parsed = dayjs(value, dateFormat, true);
  return parsed.isValid() ? parsed : dayjs();
};

export const getCalendarStyles = (
  theme: ReturnType<typeof useUnistyles>["theme"],
  defaultStyles: ReturnType<typeof useDefaultStyles>,
) => ({
  ...defaultStyles,
  today: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
  selected: {
    backgroundColor: theme.colors.primary,
  },
  selected_label: {
    color: theme.colors.onPrimary,
  },
  day_label: {
    color: theme.colors.text,
  },
  weekday_label: {
    color: theme.colors.textSecondary,
  },
  header: {
    backgroundColor: theme.colors.backgroundSecondary,
  },
  month_selector_label: {
    color: theme.colors.text,
    fontFamily: theme.typography.body.medium,
  },
  year_selector_label: {
    color: theme.colors.text,
    fontFamily: theme.typography.body.medium,
  },
  button_prev: {
    tintColor: theme.colors.primary,
  },
  button_next: {
    tintColor: theme.colors.primary,
  },
  today_label: {
    color: theme.colors.text,
  },
});
