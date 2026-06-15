import { View, Text, Pressable, Image, Modal } from "react-native";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { useUnistyles } from "react-native-unistyles";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { CalendarIcon } from "@/assets/icons";
import { rhfFieldStyles } from "../react-hook-form.styles";
import { rhfDatePickerStyles } from "./rhf-date-picker.styles";
import { IRHFDatePickerProps } from "./rhf-date-picker.interface";
import { useRHFDatePicker } from "./use-rhf-date-picker";
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_MODAL_TITLE,
  DEFAULT_PLACEHOLDER,
} from "./rhf-date-picker.data";

const RHFDatePicker = <T extends FieldValues>(
  props: IRHFDatePickerProps<T>,
) => {
  const {
    name,
    label,
    required = false,
    placeholder = DEFAULT_PLACEHOLDER,
    modalTitle = DEFAULT_MODAL_TITLE,
    dateFormat = DEFAULT_DATE_FORMAT,
    containerStyle,
  } = props;

  const { control } = useFormContext<T>();
  const { theme } = useUnistyles();
  const fieldStyles = rhfFieldStyles;
  const styles = rhfDatePickerStyles;

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
            <View style={fieldStyles.labelRow}>
              <Text style={fieldStyles.fieldLabel}>{label}</Text>
              {required && <Text style={fieldStyles.requiredMark}>*</Text>}
            </View>

            <Pressable
              style={styles.trigger}
              onPress={() => openPicker(value ?? "", dateFormat)}
              accessibilityLabel={required ? `${label}, required` : label}
            >
              <Text
                style={[
                  styles.triggerText,
                  !value && { color: theme.colors.textSecondary },
                ]}
              >
                {value || placeholder}
              </Text>
              <Image source={CalendarIcon} style={styles.triggerIcon} />
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
                <DateTimePicker
                  mode="single"
                  date={selectedDate}
                  onChange={({ date }) => {
                    if (date) setSelectedDate(dayjs(date));
                  }}
                  styles={calendarStyles}
                />
                <Pressable
                  style={styles.modalConfirmBtn}
                  onPress={() => confirm(name, dateFormat)}
                >
                  <Text style={styles.modalConfirmText}>Confirm</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </>
      )}
    />
  );
};

export default RHFDatePicker;
