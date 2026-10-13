import { TouchableOpacityProps } from "react-native";

export type IButtonVariant = "submit" | "cancel" | "disable" | "delete";

export interface IButtonProps extends TouchableOpacityProps {
  variant?: IButtonVariant;
  label: string;
}
