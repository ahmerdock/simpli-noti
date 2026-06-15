import { FieldValues, Path } from "react-hook-form";
import { StyleProp, ViewStyle } from "react-native";

export interface IRHFDatePickerProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  required?: boolean;
  placeholder?: string;
  modalTitle?: string;
  dateFormat?: string;
  containerStyle?: StyleProp<ViewStyle>;
}
