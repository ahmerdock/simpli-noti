import { StyleSheet } from "react-native-unistyles";

export const upsertNotificationsStyles = StyleSheet.create((theme) => ({
  actions: {
    flexDirection: "row",
    gap: theme.gap(1.5),
    marginTop: theme.gap(1),
  },
  cancelButton: {
    flex: 1,
    paddingVertical: theme.gap(1.5),
    borderRadius: 12,
    backgroundColor: theme.colors.backgroundSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: theme.typography.primary.medium,
    color: theme.colors.text,
  },
  saveButton: {
    flex: 1,
    paddingVertical: theme.gap(1.5),
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: theme.typography.primary.medium,
    color: theme.colors.background,
  },
}));
