import { Pressable, Text, View } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import AppIcon from "../../app-icon";
import { rhfFieldStyles } from "../react-hook-form.styles";
import RHFFieldError from "../rhf-field-error";
import RHFFieldLabel from "../rhf-field-label";
import { IRHFPickerFieldProps } from "./rhf-picker-field.interface";

export default function RHFPickerField(props: IRHFPickerFieldProps) {
  const {
    label,
    required = false,
    text,
    placeholder,
    icon,
    errorMessage,
    containerStyle,
    onPress,
  } = props;

  const { theme } = useUnistyles();

  const displayText = text || placeholder;

  return (
    <View style={[rhfFieldStyles.fieldWrapper, containerStyle]}>
      <RHFFieldLabel label={label} required={required} />

      <Pressable
        style={rhfFieldStyles.trigger}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={required ? `${label}, required` : label}
        accessibilityValue={{ text: displayText }}
      >
        <Text
          style={[
            rhfFieldStyles.triggerText,
            !text && rhfFieldStyles.triggerPlaceholder,
          ]}
        >
          {displayText}
        </Text>
        <AppIcon icon={icon} size={16} color={theme.colors.textSecondary} />
      </Pressable>

      {errorMessage && <RHFFieldError message={errorMessage} />}
    </View>
  );
}
