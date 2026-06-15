import { FieldValues, Path } from "react-hook-form";
import { StyleProp, TextInputProps, ViewStyle } from "react-native";

export interface IRHFTextFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  required?: boolean;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  showCharCount?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textInputProps?: Omit<
    TextInputProps,
    "value" | "onChangeText" | "multiline" | "numberOfLines" | "maxLength"
  >;
}
