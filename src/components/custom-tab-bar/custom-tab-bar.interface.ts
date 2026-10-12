import type { BottomTabBarProps } from "expo-router/build/react-navigation/bottom-tabs";

export type ICustomTabBarProps = Pick<
  BottomTabBarProps,
  "state" | "navigation"
>;
