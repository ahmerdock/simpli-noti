import type { ReactNode } from "react";
import type { ImageSourcePropType } from "react-native";

export interface IActionCardProps {
  label: string;
  description: string;
  icon: ImageSourcePropType;
  onPress?: () => void;
  disabled?: boolean;
  trailing?: ReactNode;
}
