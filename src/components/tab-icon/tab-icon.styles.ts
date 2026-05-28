import { StyleSheet } from "react-native-unistyles";

const ICON_SIZE = 20;

export const tabIconStyles = StyleSheet.create((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  iconFocused: {
    tintColor: theme.colors.text,
  },
  iconUnfocused: {
    tintColor: theme.colors.textSecondary,
  },
}));
