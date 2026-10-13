import { Controller, FieldValues, useFormContext } from "react-hook-form";
import Clock from "lucide-react-native/icons/clock";
import TimePicker from "../../time-picker";
import RHFModalSheet from "../rhf-modal-sheet";
import RHFPickerField from "../rhf-picker-field";
import { IRHFTimePickerProps } from "./rhf-time-picker.interface";
import useRHFTimePicker from "./use-rhf-time-picker";
import {
  DEFAULT_MODAL_TITLE,
  DEFAULT_PLACEHOLDER,
  isValidTimeValue,
} from "./rhf-time-picker.utils";

export default function RHFTimePicker<T extends FieldValues>(
  props: IRHFTimePickerProps<T>,
) {
  const {
    name,
    label,
    required = false,
    placeholder = DEFAULT_PLACEHOLDER,
    modalTitle = DEFAULT_MODAL_TITLE,
    containerStyle,
  } = props;

  const { control } = useFormContext<T>();

  const {
    visible,
    hour,
    minute,
    period,
    openPicker,
    closePicker,
    handleTimeChange,
    confirm,
  } = useRHFTimePicker();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const displayValue = isValidTimeValue(value) ? value : "";

        return (
          <>
            <RHFPickerField
              label={label}
              required={required}
              text={displayValue}
              placeholder={placeholder}
              icon={Clock}
              errorMessage={error?.message}
              containerStyle={containerStyle}
              onPress={() => openPicker(displayValue)}
            />

            <RHFModalSheet
              visible={visible}
              title={modalTitle}
              onClose={closePicker}
              onConfirm={() => confirm(onChange)}
            >
              <TimePicker
                hour={hour}
                minute={minute}
                period={period}
                onChange={handleTimeChange}
              />
            </RHFModalSheet>
          </>
        );
      }}
    />
  );
}
