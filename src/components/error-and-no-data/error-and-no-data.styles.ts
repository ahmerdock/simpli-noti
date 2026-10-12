import { StyleSheet } from "react-native-unistyles";

export const errorAndNoDataStyles = StyleSheet.create((theme, runtime) => ({
  container: {
    minHeight: runtime.screen.height * 0.5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrap: {
    marginBottom: theme.gap(1),
  },
  messageText: {
    fontFamily: theme.typography.body.bold,
    fontSize: 20,
    color: theme.colors.text,
    textAlign: "center",
  },
  descriptionText: {
    fontFamily: theme.typography.body.regular,
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
}));
