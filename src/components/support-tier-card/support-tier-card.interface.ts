import type { ImageSourcePropType } from "react-native";

export interface ISupportTierCardProps {
  label: string;
  description: string;
  icon: ImageSourcePropType;
  displayPrice: string | null;
  isPurchasing: boolean;
  disabled: boolean;
  onPress: () => void;
}
