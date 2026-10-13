import type { StyleProp, ViewStyle } from "react-native";
import type { IAppIcon } from "@/components/app-icon/app-icon.interface";

export interface IRHFPickerFieldProps {
  label: string;
  required?: boolean;
  text: string;
  placeholder: string;
  icon: IAppIcon;
  errorMessage?: string;
  containerStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
}
