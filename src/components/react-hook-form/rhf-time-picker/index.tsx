import { View, Text, Pressable, Image, Modal } from "react-native";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { useUnistyles } from "react-native-unistyles";
import { ClockIcon } from "@/assets/icons";
import TimePicker from "@/components/time-picker";
import { rhfFieldStyles } from "../react-hook-form.styles";
import { rhfTimePickerStyles } from "./rhf-time-picker.styles";
import { IRHFTimePickerProps } from "./rhf-time-picker.interface";
import { useRHFTimePicker } from "./use-rhf-time-picker";
import {
  DEFAULT_MODAL_TITLE,
  DEFAULT_PLACEHOLDER,
} from "./rhf-time-picker.utils";
import { isValidTimeValue } from "./rhf-time-picker.utils";

const RHFTimePicker = <T extends FieldValues>(
  props: IRHFTimePickerProps<T>,
) => {
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
  const styles = rhfTimePickerStyles;

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
                style={styles.trigger}
                onPress={() => openPicker(displayValue)}
                accessibilityLabel={required ? `${label}, required` : label}
              >
                <Text
                  style={[
                    styles.triggerText,
                    !displayValue && { color: theme.colors.textSecondary },
                  ]}
                >
                  {displayValue || placeholder}
                </Text>
                <Image source={ClockIcon} style={styles.triggerIcon} />
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
              <View style={styles.modalOverlay}>
                <Pressable style={styles.modalBackdrop} onPress={closePicker} />
                <View style={styles.modalSheet}>
                  <View style={styles.modalHandle} />
                  <Text style={styles.modalTitle}>{modalTitle}</Text>
                  <TimePicker
                    hour={hour}
                    minute={minute}
                    period={period}
                    onChange={handleTimeChange}
                  />
                  <Pressable
                    style={styles.modalConfirmBtn}
                    onPress={() => confirm(onChange)}
                  >
                    <Text style={styles.modalConfirmText}>Confirm</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </>
        );
      }}
    />
  );
};

export default RHFTimePicker;
