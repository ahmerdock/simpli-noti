import { StyleSheet } from "react-native-unistyles";

export const homeStyles = StyleSheet.create((theme) => ({
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 100,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    gap: theme.gap(2),
    paddingTop: theme.gap(1),
  },
  sectionLabel: {
    fontSize: 12,
    fontFamily: theme.typography.body.regular,
    color: theme.colors.textSecondary,
    letterSpacing: 0.8,
  },
}));
