import { StyleSheet as RNStyleSheet } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export const rhfSelectStyles = StyleSheet.create((theme) => ({
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
  option: {
    paddingVertical: theme.gap(1.5),
    paddingHorizontal: theme.gap(1),
    borderRadius: 10,
  },
  optionText: {
    fontSize: 15,
    fontFamily: theme.typography.primary.regular,
    color: theme.colors.text,
  },
  optionActive: {
    backgroundColor: theme.colors.primary,
  },
  optionTextActive: {
    fontFamily: theme.typography.primary.medium,
    color: theme.colors.onPrimary,
  },
  optionDivider: {
    height: 0.5,
    backgroundColor: theme.colors.textSecondary,
    opacity: 0.2,
  },
}));
