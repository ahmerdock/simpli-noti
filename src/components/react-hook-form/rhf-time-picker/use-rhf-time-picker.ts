import { useState } from "react";
import {
  buildTimeValue,
  DEFAULT_TIME,
  parseTimeValue,
} from "./rhf-time-picker.utils";

export const useRHFTimePicker = () => {
  const [visible, setVisible] = useState(false);
  const [{ hour, minute, period }, setTime] = useState(DEFAULT_TIME);

  const openPicker = (currentValue: string) => {
    setTime(parseTimeValue(currentValue) ?? DEFAULT_TIME);
    setVisible(true);
  };

  const closePicker = () => setVisible(false);

  const handleTimeChange = (h: string, m: string, p: string) =>
    setTime({ hour: h, minute: m, period: p });

  const confirm = (onChange: (value: string) => void) => {
    onChange(buildTimeValue(hour, minute, period));
    closePicker();
  };

  return {
    visible,
    hour,
    minute,
    period,
    openPicker,
    closePicker,
    handleTimeChange,
    confirm,
  };
};
