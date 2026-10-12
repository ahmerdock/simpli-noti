import { StyleSheet as RNStyleSheet } from "react-native";
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
    color: theme.colors.destructive,
    marginLeft: 2,
  },
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
    color: theme.colors.onPrimary,
  },
  fieldError: {
    fontSize: 11,
    fontFamily: theme.typography.primary.regular,
    color: theme.colors.destructive,
  },
}));
