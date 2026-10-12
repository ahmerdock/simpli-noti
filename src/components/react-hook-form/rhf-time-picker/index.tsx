import { View, Text, Pressable, Modal } from "react-native";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { useUnistyles } from "react-native-unistyles";
import Clock from "lucide-react-native/icons/clock";
import AppIcon from "../../app-icon";
import TimePicker from "../../time-picker";
import { rhfFieldStyles } from "../react-hook-form.styles";
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
              <View style={fieldStyles.labelRow}>
                <Text style={fieldStyles.fieldLabel}>{label}</Text>
                {required && <Text style={fieldStyles.requiredMark}>*</Text>}
              </View>

              <Pressable
                style={fieldStyles.trigger}
                onPress={() => openPicker(displayValue)}
                accessibilityLabel={required ? `${label}, required` : label}
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

              {error && (
                <Text style={fieldStyles.fieldError}>{error.message}</Text>
              )}
            </View>

            <Modal
              visible={visible}
              transparent
              animationType="slide"
              onRequestClose={closePicker}
            >
              <View style={fieldStyles.modalOverlay}>
                <Pressable
                  style={fieldStyles.modalBackdrop}
                  onPress={closePicker}
                />
                <View style={fieldStyles.modalSheet}>
                  <View style={fieldStyles.modalHandle} />
                  <Text style={fieldStyles.modalTitle}>{modalTitle}</Text>
                  <TimePicker
                    hour={hour}
                    minute={minute}
                    period={period}
                    onChange={handleTimeChange}
                  />
                  <Pressable
                    style={fieldStyles.modalConfirmBtn}
                    onPress={() => confirm(onChange)}
                  >
                    <Text style={fieldStyles.modalConfirmText}>Confirm</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </>
        );
      }}
    />
  );
}
