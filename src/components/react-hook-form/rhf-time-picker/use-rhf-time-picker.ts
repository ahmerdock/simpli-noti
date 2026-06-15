import { useRef, useState } from "react";
import {
  buildTimeValue,
  parseTimeValue,
  DEFAULT_HOUR,
  DEFAULT_MINUTE,
  DEFAULT_PERIOD,
} from "./rhf-time-picker.utils";

export const useRHFTimePicker = () => {
  const [visible, setVisible] = useState(false);
  const [hour, setHour] = useState(DEFAULT_HOUR);
  const [minute, setMinute] = useState(DEFAULT_MINUTE);
  const [period, setPeriod] = useState(DEFAULT_PERIOD);

  const hourRef = useRef(DEFAULT_HOUR);
  const minuteRef = useRef(DEFAULT_MINUTE);
  const periodRef = useRef(DEFAULT_PERIOD);

  const syncWheelState = (h: string, m: string, p: string) => {
    hourRef.current = h;
    minuteRef.current = m;
    periodRef.current = p;
    setHour(h);
    setMinute(m);
    setPeriod(p);
  };

  const openPicker = (currentValue: string) => {
    const parsed = parseTimeValue(currentValue);
    if (parsed) {
      syncWheelState(parsed.hour, parsed.minute, parsed.period);
    } else {
      syncWheelState(DEFAULT_HOUR, DEFAULT_MINUTE, DEFAULT_PERIOD);
    }
    setVisible(true);
  };

  const closePicker = () => setVisible(false);

  const handleTimeChange = (h: string, m: string, p: string) => {
    syncWheelState(h, m, p);
  };

  const confirm = (onChange: (value: string) => void) => {
    onChange(
      buildTimeValue(hourRef.current, minuteRef.current, periodRef.current),
    );
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
