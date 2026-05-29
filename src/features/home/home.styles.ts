import { StyleSheet } from "react-native-unistyles";

export const homeStyles = StyleSheet.create((theme, runtime) => ({
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 100,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonIcon: {
    width: 24,
    height: 24,
    tintColor: theme.colors.background,
  },
}));
