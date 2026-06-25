import { StyleSheet } from "react-native-unistyles";

export const helpMeStyles = StyleSheet.create((theme) => ({
  unavailable: {
    fontSize: 14,
    marginBottom: theme.gap(1),
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.primary.regular,
  },
}));
