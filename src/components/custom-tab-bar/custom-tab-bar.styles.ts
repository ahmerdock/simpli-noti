import { StyleSheet } from "react-native-unistyles";

export const customTabBarStyles = StyleSheet.create((theme) => ({
  container: {
    position: "absolute",
    left: 20,
    right: 20,
    borderRadius: 50,
    backgroundColor: theme.colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: theme.colors.background,
    overflow: "hidden",
    flexDirection: "row",
  },
  viewPill: (tabWidth: number) => ({
    position: "absolute",
    top: 4,
    bottom: 4,
    left: 4,
    width: tabWidth - 8,
    borderRadius: 50,
    overflow: "hidden",
  }),
}));
