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
  addButtonIcon: {
    width: 24,
    height: 24,
    tintColor: theme.colors.onPrimary,
  },
  listContent: {
    gap: theme.gap(2),
    paddingTop: theme.gap(1),
  },
  sectionLabel: {
    fontSize: 12,
    fontFamily: theme.typography.primary.regular,
    color: theme.colors.textSecondary,
    letterSpacing: 0.8,
  },
}));
