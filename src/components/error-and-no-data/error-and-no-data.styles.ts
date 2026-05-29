import { StyleSheet } from "react-native-unistyles";

export const errorAndNoDataStyles = StyleSheet.create((theme, runtime) => ({
  container: (height?: number) => ({
    minHeight: height || runtime.screen.height * 0.5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.gap(4),
  }),
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.gap(1),
  },
  image: {
    width: 30,
    height: 30,
    tintColor: theme.colors.primary,
  },
  messageText: {
    fontFamily: theme.typography.secondary.bold,
    fontSize: 20,
    color: theme.colors.text,
    textAlign: "center",
  },
  descriptionText: {
    fontFamily: theme.typography.primary.regular,
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
  button: {
    backgroundColor: theme.colors.primary,
    marginTop: theme.gap(2),
  },
  childrenContainer: {
    marginTop: theme.gap(4),
  },
}));
