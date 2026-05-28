import { StyleSheet } from "react-native-unistyles";

export const settingsStyles = StyleSheet.create((theme) => ({
  appearance: {
    fontFamily: theme.typography.primary.regular,
    fontSize: 18,
    color: theme.colors.textSecondary,
    marginBottom: theme.gap(2),
  },
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
  switch: {
    alignSelf: "center",
  },
}));
