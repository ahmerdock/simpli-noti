import { useEffect, useState } from "react";
import { LayoutChangeEvent } from "react-native";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useUnistyles } from "react-native-unistyles";
import { ICustomTabBarProps } from "./custom-tab-bar.interface";

const useCustomTabBar = (props: ICustomTabBarProps) => {
  const { state } = props;

  const { theme } = useUnistyles();
  const [tabBarWidth, setTabBarWidth] = useState(0);

  const tabCount = state.routes.length;
  const tabWidth = tabBarWidth > 0 ? tabBarWidth / tabCount : 0;

  const pillX = useSharedValue(0);

  const onLayout = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    setTabBarWidth(width);
    // Set pill position instantly on first layout without animation
    pillX.value = state.index * (width / tabCount);
  };

  useEffect(() => {
    if (tabWidth > 0) {
      pillX.value = withSpring(state.index * tabWidth, {
        damping: 18,
        stiffness: 180,
        mass: 0.7,
      });
    }
  }, [state.index, tabWidth]);

  const pillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: pillX.value }],
  }));

  const gradientColors: [string, string] = [
    theme.colors.background,
    theme.colors.primary,
  ];

  return {
    tabBarWidth,
    pillX,
    tabWidth,
    pillStyle,
    gradientColors,
    onLayout,
  };
};

export default useCustomTabBar;
