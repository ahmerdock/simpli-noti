import { StyleSheet as RNStyleSheet } from "react-native";
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
  form: {
    gap: theme.gap(2),
    paddingTop: theme.gap(1),
  },
  fieldWrapper: {
    gap: theme.gap(0.75),
  },
  fieldLabel: {
    fontSize: 12,
    fontFamily: theme.typography.primary.medium,
    color: theme.colors.textSecondary,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  fieldError: {
    fontSize: 11,
    fontFamily: theme.typography.primary.regular,
    color: "#ff4d4d",
  },
  dateTimeRow: {
    flexDirection: "row",
    gap: theme.gap(1.5),
  },
  dateTimeField: {
    flex: 1,
  },
  dropdownTrigger: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 12,
    paddingHorizontal: theme.gap(1.5),
    paddingVertical: theme.gap(1.25),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownTriggerText: {
    fontSize: 15,
    fontFamily: theme.typography.primary.regular,
    color: theme.colors.text,
  },
  dropdownIcon: {
    width: 16,
    height: 16,
    tintColor: theme.colors.textSecondary,
  },

  // modal shared
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    ...RNStyleSheet.absoluteFill,
  },
  modalSheet: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: theme.gap(2),
    paddingBottom: theme.gap(3),
    paddingTop: theme.gap(1.5),
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.textSecondary,
    alignSelf: "center",
    marginBottom: theme.gap(1.5),
    opacity: 0.4,
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: theme.typography.primary.medium,
    color: theme.colors.text,
    textAlign: "center",
    marginBottom: theme.gap(1.5),
  },
  modalConfirmBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: theme.gap(1.5),
    alignItems: "center",
    marginTop: theme.gap(1.5),
  },
  modalConfirmText: {
    fontSize: 15,
    fontFamily: theme.typography.primary.medium,
    color: theme.colors.background,
  },

  // repeat dropdown options
  repeatOption: {
    paddingVertical: theme.gap(1.5),
    paddingHorizontal: theme.gap(1),
    borderRadius: 10,
  },
  repeatOptionText: {
    fontSize: 15,
    fontFamily: theme.typography.primary.regular,
    color: theme.colors.text,
  },
  repeatOptionActive: {
    backgroundColor: theme.colors.primary,
  },
  repeatOptionTextActive: {
    fontFamily: theme.typography.primary.medium,
    color: theme.colors.background,
  },
  repeatOptionDivider: {
    height: 0.5,
    backgroundColor: theme.colors.textSecondary,
    opacity: 0.2,
  },
}));
