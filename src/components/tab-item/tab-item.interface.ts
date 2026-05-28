import { ImageSourcePropType } from "react-native";
import { SharedValue } from "react-native-reanimated";

export interface ITabItemProps {
  icon: ImageSourcePropType;
  label: string;
  isFocused: boolean;
  onPress: () => void;
  pillX: SharedValue<number>;
  tabIndex: number;
  tabWidth: number;
}
