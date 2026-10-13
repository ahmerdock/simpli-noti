import { useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { FieldValues, Path, PathValue, useFormContext } from "react-hook-form";
import { useUnistyles } from "react-native-unistyles";
import { useDefaultStyles } from "react-native-ui-datepicker";
import { getCalendarStyles, parseDateValue } from "./rhf-date-picker.utils";

export default function useRHFDatePicker<T extends FieldValues>() {
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
    setValue(name, selectedDate.format(dateFormat) as PathValue<T, Path<T>>, {
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
}
