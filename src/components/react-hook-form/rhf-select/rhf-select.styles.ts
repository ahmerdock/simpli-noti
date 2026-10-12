import { StyleSheet } from "react-native-unistyles";

export const rhfSelectStyles = StyleSheet.create((theme) => ({
  option: {
    paddingVertical: theme.gap(1.5),
    paddingHorizontal: theme.gap(1),
    borderRadius: 10,
  },
  optionText: {
    fontSize: 15,
    fontFamily: theme.typography.body.regular,
    color: theme.colors.text,
  },
  optionActive: {
    backgroundColor: theme.colors.primary,
  },
  optionTextActive: {
    fontFamily: theme.typography.body.medium,
    color: theme.colors.onPrimary,
  },
  optionDivider: {
    height: 0.5,
    backgroundColor: theme.colors.textSecondary,
    opacity: 0.2,
  },
}));
