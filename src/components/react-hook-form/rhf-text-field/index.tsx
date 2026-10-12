import { View, Text, TextInput } from "react-native";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { useUnistyles } from "react-native-unistyles";
import { rhfFieldStyles } from "../react-hook-form.styles";
import { rhfTextFieldStyles } from "./rhf-text-field.styles";
import { IRHFTextFieldProps } from "./rhf-text-field.interface";

export default function RHFTextField<T extends FieldValues>(props: IRHFTextFieldProps<T>) {
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
  const fieldStyles = rhfFieldStyles;
  const inputStyles = rhfTextFieldStyles;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={[fieldStyles.fieldWrapper, containerStyle]}>
          <View style={fieldStyles.labelRow}>
            <Text style={fieldStyles.fieldLabel}>{label}</Text>
            {required && <Text style={fieldStyles.requiredMark}>*</Text>}
          </View>

          <TextInput
            style={[
              inputStyles.textInput,
              multiline && inputStyles.textInputMultiline,
            ]}
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

          {error && <Text style={fieldStyles.fieldError}>{error.message}</Text>}

          {showCharCount && maxLength != null && (
            <Text style={inputStyles.charCount}>
              {(value ?? "").length} / {maxLength}
            </Text>
          )}
        </View>
      )}
    />
  );
}
