import { TouchableOpacityProps } from "react-native";

export type ButtonVariant = "submit" | "cancel";

export interface IButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  label: string;
}
