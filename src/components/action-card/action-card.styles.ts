import { StyleSheet } from "react-native-unistyles";

export const actionCardStyles = StyleSheet.create((theme) => ({
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  textWrap: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontFamily: theme.typography.secondary.bold,
    color: theme.colors.text,
  },
  description: {
    fontSize: 14,
    marginTop: 2,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.primary.regular,
  },
  trailingWrap: {
    minWidth: 56,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.5,
  },
  trailingText: {
    fontSize: 14,
    fontFamily: theme.typography.primary.medium,
    color: theme.colors.text,
  },
}));
