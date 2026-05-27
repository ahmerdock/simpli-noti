import { StyleSheet } from "react-native-unistyles";

export const screenTitleStyles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontFamily: theme.typography.secondary.bold,
    color: theme.colors.text,
  },
}));
