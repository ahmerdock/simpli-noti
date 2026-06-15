import { FieldValues, Path } from "react-hook-form";
import { StyleProp, ViewStyle } from "react-native";

export interface IRHFTimePickerProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  required?: boolean;
  placeholder?: string;
  modalTitle?: string;
  timeFormat?: string;
  containerStyle?: StyleProp<ViewStyle>;
}
