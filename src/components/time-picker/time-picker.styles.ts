import { StyleSheet } from "react-native-unistyles";

export const timePickerStyles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 16,
    paddingHorizontal: 8,
    overflow: "hidden",
  },
  separator: {
    fontSize: 20,
    color: theme.colors.textSecondary,
    paddingBottom: 2,
  },
}));
