import { View, Text, TextInput } from "react-native";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { useUnistyles } from "react-native-unistyles";
import { rhfFieldStyles } from "../react-hook-form.styles";
import RHFFieldLabel from "../rhf-field-label";
import RHFFieldError from "../rhf-field-error";
import { rhfTextFieldStyles } from "./rhf-text-field.styles";
import { IRHFTextFieldProps } from "./rhf-text-field.interface";

export default function RHFTextField<T extends FieldValues>(
  props: IRHFTextFieldProps<T>,
) {
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

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={[rhfFieldStyles.fieldWrapper, containerStyle]}>
          <RHFFieldLabel label={label} required={required} />

          <TextInput
            style={[
              rhfTextFieldStyles.textInput,
              multiline && rhfTextFieldStyles.textInputMultiline,
            ]}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.textSecondary}
            accessibilityLabel={required ? `${label}, required` : label}
            value={value ?? ""}
            onChangeText={onChange}
            multiline={multiline}
            numberOfLines={numberOfLines}
            maxLength={maxLength}
            {...textInputProps}
          />

          {error && <RHFFieldError message={error.message} />}

          {showCharCount && maxLength != null && (
            <Text style={rhfTextFieldStyles.charCount}>
              {(value ?? "").length} / {maxLength}
            </Text>
          )}
        </View>
      )}
    />
  );
}
