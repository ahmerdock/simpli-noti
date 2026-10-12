import {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";
import { ICustomSwitchProps } from "./custom-switch.interface";

const THUMB_TRAVEL = 18;

export default function useCustomSwitch(props: ICustomSwitchProps) {
  const { value, onValueChange } = props;

  const toggleSwitch = () => onValueChange(!value);

  // Driven by `value`, so the thumb also follows changes made outside the switch.
  const translateX = useDerivedValue(() =>
    withSpring(value ? THUMB_TRAVEL : 0, { damping: 15, stiffness: 200 }),
  );

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return {
    toggleSwitch,
    thumbStyle,
  };
}
