import { FieldValues, Path } from "react-hook-form";
import { StyleProp, ViewStyle } from "react-native";

export type ISelectOption<V extends string = string> = {
  label: string;
  value: V;
};

export interface IRHFSelectProps<T extends FieldValues, V extends string> {
  name: Path<T>;
  label: string;
  options: readonly ISelectOption<V>[];
  required?: boolean;
  placeholder?: string;
  modalTitle?: string;
  containerStyle?: StyleProp<ViewStyle>;
}
