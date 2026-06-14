import { StyleSheet } from "react-native-unistyles";

export const upsertNotificationsStyles = StyleSheet.create((theme) => ({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  backdropPressable: {
    flex: 1,
  },
  card: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: theme.gap(2),
    paddingBottom: theme.gap(4),
    gap: theme.gap(2),
  },
  title: {
    fontSize: 18,
    fontFamily: theme.typography.secondary.bold,
    color: theme.colors.text,
  },
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
