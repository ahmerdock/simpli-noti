import { StyleSheet } from "react-native-unistyles";

export const rhfFieldStyles = StyleSheet.create((theme) => ({
  fieldWrapper: {
    gap: theme.gap(0.75),
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  fieldLabel: {
    fontSize: 12,
    fontFamily: theme.typography.primary.medium,
    color: theme.colors.textSecondary,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  requiredMark: {
    fontSize: 10,
    lineHeight: 12,
    fontFamily: theme.typography.primary.medium,
    color: "#ff4d4d",
    marginLeft: 2,
  },
  fieldError: {
    fontSize: 11,
    fontFamily: theme.typography.primary.regular,
    color: "#ff4d4d",
  },
}));
