import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { ICustomSwitchProps } from "./custom-switch.interface";

export default function useCustomSwitch(props: ICustomSwitchProps) {
  const { value, onValueChange } = props;

  const translateX = useSharedValue(value ? 18 : 0);

  const toggleSwitch = () => {
    const next = !value;
    translateX.value = withSpring(next ? 18 : 0, {
      damping: 15,
      stiffness: 200,
    });
    onValueChange(next);
  };

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return {
    toggleSwitch,
    thumbStyle,
  };
}
