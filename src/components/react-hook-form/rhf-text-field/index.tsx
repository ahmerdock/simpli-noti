import { View, Text, TextInput } from "react-native";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { useUnistyles } from "react-native-unistyles";
import { rhfTextFieldStyles } from "./rhf-text-field.styles";
import { IRHFTextFieldProps } from "./rhf-text-field.interface";

const RHFTextField = <T extends FieldValues>(props: IRHFTextFieldProps<T>) => {
  const {
    name,
    label,
    required = false,
    placeholder,
    multiline = false,
    numberOfLines,
    maxLength,
    showCharCount = false,
    containerStyle,
    textInputProps,
  } = props;

  const { control } = useFormContext<T>();
  const { theme } = useUnistyles();
  const styles = rhfTextFieldStyles;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={[styles.fieldWrapper, containerStyle]}>
          <View style={styles.labelRow}>
            <Text style={styles.fieldLabel}>{label}</Text>
            {required && <Text style={styles.requiredMark}>*</Text>}
          </View>

          <TextInput
            style={[styles.textInput, multiline && styles.textInputMultiline]}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.textSecondary}
            accessibilityLabel={required ? `${label}, required` : label}
            value={value ?? ""}
            onChangeText={(text) => {
              if (maxLength && text.length > maxLength) return;
              onChange(text);
            }}
            multiline={multiline}
            numberOfLines={numberOfLines}
            maxLength={maxLength}
            {...textInputProps}
          />

          {error && <Text style={styles.fieldError}>{error.message}</Text>}

          {showCharCount && maxLength != null && (
            <Text style={styles.charCount}>
              {(value ?? "").length} / {maxLength}
            </Text>
          )}
        </View>
      )}
    />
  );
};

export default RHFTextField;
