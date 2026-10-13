import { Controller, FieldValues, useFormContext } from "react-hook-form";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import Calendar from "lucide-react-native/icons/calendar";
import { DATE_FORMAT } from "@/constants/date-time";
import RHFModalSheet from "../rhf-modal-sheet";
import RHFPickerField from "../rhf-picker-field";
import { IRHFDatePickerProps } from "./rhf-date-picker.interface";
import useRHFDatePicker from "./use-rhf-date-picker";
import {
  DEFAULT_MODAL_TITLE,
  DEFAULT_PLACEHOLDER,
} from "./rhf-date-picker.utils";

export default function RHFDatePicker<T extends FieldValues>(
  props: IRHFDatePickerProps<T>,
) {
  const {
    name,
    label,
    required = false,
    placeholder = DEFAULT_PLACEHOLDER,
    modalTitle = DEFAULT_MODAL_TITLE,
    dateFormat = DATE_FORMAT,
    containerStyle,
  } = props;

  const { control } = useFormContext<T>();

  const {
    visible,
    selectedDate,
    setSelectedDate,
    openPicker,
    closePicker,
    confirm,
    calendarStyles,
  } = useRHFDatePicker<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value }, fieldState: { error } }) => (
        <>
          <RHFPickerField
            label={label}
            required={required}
            text={value ?? ""}
            placeholder={placeholder}
            icon={Calendar}
            errorMessage={error?.message}
            containerStyle={containerStyle}
            onPress={() => openPicker(value ?? "", dateFormat)}
          />

          <RHFModalSheet
            visible={visible}
            title={modalTitle}
            onClose={closePicker}
            onConfirm={() => confirm(name, dateFormat)}
          >
            <DateTimePicker
              key={selectedDate.format("YYYY-MM-DD")}
              mode="single"
              date={selectedDate}
              onChange={({ date }) => {
                if (date) setSelectedDate(dayjs(date));
              }}
              styles={calendarStyles}
            />
          </RHFModalSheet>
        </>
      )}
    />
  );
}
