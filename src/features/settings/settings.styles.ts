import { StyleSheet } from "react-native-unistyles";

export const settingsStyles = StyleSheet.create((theme) => ({
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
  sub: {
    fontSize: 14,
    marginTop: 2,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.primary.regular,
  },
  contactMe: {
    marginTop: theme.gap(1),
  },
}));
