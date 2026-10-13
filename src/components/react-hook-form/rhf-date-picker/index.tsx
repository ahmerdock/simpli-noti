import { View, Text, Pressable } from "react-native";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { useUnistyles } from "react-native-unistyles";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import Calendar from "lucide-react-native/icons/calendar";
import { DATE_FORMAT } from "@/constants/date-time";
import AppIcon from "../../app-icon";
import { rhfFieldStyles } from "../react-hook-form.styles";
import RHFFieldLabel from "../rhf-field-label";
import RHFFieldError from "../rhf-field-error";
import RHFModalSheet from "../rhf-modal-sheet";
import { IRHFDatePickerProps } from "./rhf-date-picker.interface";
import { useRHFDatePicker } from "./use-rhf-date-picker";
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
  const { theme } = useUnistyles();
  const fieldStyles = rhfFieldStyles;

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
          <View style={[fieldStyles.fieldWrapper, containerStyle]}>
            <RHFFieldLabel label={label} required={required} />

            <Pressable
              style={fieldStyles.trigger}
              onPress={() => openPicker(value ?? "", dateFormat)}
              accessibilityRole="button"
              accessibilityLabel={required ? `${label}, required` : label}
              accessibilityValue={{ text: value || placeholder }}
            >
              <Text
                style={[
                  fieldStyles.triggerText,
                  !value && { color: theme.colors.textSecondary },
                ]}
              >
                {value || placeholder}
              </Text>
              <AppIcon
                icon={Calendar}
                size={16}
                color={theme.colors.textSecondary}
              />
            </Pressable>

            {error && <RHFFieldError message={error.message} />}
          </View>

          <RHFModalSheet
            visible={visible}
            title={modalTitle}
            onClose={closePicker}
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
            <Pressable
              style={fieldStyles.modalConfirmBtn}
              accessibilityRole="button"
              onPress={() => confirm(name, dateFormat)}
            >
              <Text style={fieldStyles.modalConfirmText}>Confirm</Text>
            </Pressable>
          </RHFModalSheet>
        </>
      )}
    />
  );
}
