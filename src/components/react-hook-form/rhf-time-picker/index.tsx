import { View, Text, Pressable } from "react-native";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { useUnistyles } from "react-native-unistyles";
import Clock from "lucide-react-native/icons/clock";
import AppIcon from "../../app-icon";
import TimePicker from "../../time-picker";
import { rhfFieldStyles } from "../react-hook-form.styles";
import RHFFieldLabel from "../rhf-field-label";
import RHFFieldError from "../rhf-field-error";
import RHFModalSheet from "../rhf-modal-sheet";
import { IRHFTimePickerProps } from "./rhf-time-picker.interface";
import { useRHFTimePicker } from "./use-rhf-time-picker";
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
  const { theme } = useUnistyles();
  const fieldStyles = rhfFieldStyles;

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
            <View style={[fieldStyles.fieldWrapper, containerStyle]}>
              <RHFFieldLabel label={label} required={required} />

              <Pressable
                style={fieldStyles.trigger}
                onPress={() => openPicker(displayValue)}
                accessibilityRole="button"
                accessibilityLabel={required ? `${label}, required` : label}
                accessibilityValue={{ text: displayValue || placeholder }}
              >
                <Text
                  style={[
                    fieldStyles.triggerText,
                    !displayValue && { color: theme.colors.textSecondary },
                  ]}
                >
                  {displayValue || placeholder}
                </Text>
                <AppIcon
                  icon={Clock}
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
              <TimePicker
                hour={hour}
                minute={minute}
                period={period}
                onChange={handleTimeChange}
              />
              <Pressable
                style={fieldStyles.modalConfirmBtn}
                accessibilityRole="button"
                onPress={() => confirm(onChange)}
              >
                <Text style={fieldStyles.modalConfirmText}>Confirm</Text>
              </Pressable>
            </RHFModalSheet>
          </>
        );
      }}
    />
  );
}
