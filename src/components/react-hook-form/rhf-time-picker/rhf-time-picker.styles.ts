import { StyleSheet as RNStyleSheet } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export const rhfTimePickerStyles = StyleSheet.create((theme) => ({
  trigger: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 12,
    paddingHorizontal: theme.gap(1.5),
    paddingVertical: theme.gap(1.25),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  triggerText: {
    fontSize: 15,
    fontFamily: theme.typography.primary.regular,
    color: theme.colors.text,
  },
  triggerIcon: {
    width: 16,
    height: 16,
    tintColor: theme.colors.textSecondary,
  },
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
}));
