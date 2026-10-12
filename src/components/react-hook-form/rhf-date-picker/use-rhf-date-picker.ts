import { useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { useUnistyles } from "react-native-unistyles";
import { useDefaultStyles } from "react-native-ui-datepicker";
import { parseDateValue } from "./rhf-date-picker.utils";

const getCalendarStyles = (
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
    fontFamily: theme.typography.primary.medium,
  },
  year_selector_label: {
    color: theme.colors.text,
    fontFamily: theme.typography.primary.medium,
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

export const useRHFDatePicker = <T extends FieldValues>() => {
  const { setValue } = useFormContext<T>();
  const { theme } = useUnistyles();
  const defaultStyles = useDefaultStyles();

  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const calendarStyles = useMemo(
    () => getCalendarStyles(theme, defaultStyles),
    [theme, defaultStyles],
  );

  const openPicker = (currentValue: string, dateFormat: string) => {
    setSelectedDate(parseDateValue(currentValue, dateFormat));
    setVisible(true);
  };

  const closePicker = () => setVisible(false);

  const confirm = (name: Path<T>, dateFormat: string) => {
    setValue(name, selectedDate.format(dateFormat) as never, {
      shouldValidate: true,
    });
    closePicker();
  };

  return {
    visible,
    selectedDate,
    setSelectedDate,
    openPicker,
    closePicker,
    confirm,
    calendarStyles,
  };
};
