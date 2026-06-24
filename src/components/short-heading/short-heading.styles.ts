import { StyleSheet } from "react-native-unistyles";

export const shortHeadingStyles = StyleSheet.create((theme) => ({
  heading: {
    fontFamily: theme.typography.primary.regular,
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: theme.gap(2),
    letterSpacing: 0.8,
  },
}));
