import { StyleSheet } from "react-native-unistyles";

export const rhfTextFieldStyles = StyleSheet.create((theme) => ({
  textInput: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 12,
    paddingHorizontal: theme.gap(1.5),
    paddingVertical: theme.gap(1.25),
    fontSize: 15,
    fontFamily: theme.typography.primary.regular,
    color: theme.colors.text,
  },
  textInputMultiline: {
    minHeight: 90,
    textAlignVertical: "top",
  },
  charCount: {
    fontSize: 11,
    fontFamily: theme.typography.primary.regular,
    color: theme.colors.textSecondary,
    textAlign: "right",
    marginTop: theme.gap(0.25),
  },
}));
