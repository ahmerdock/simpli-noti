import { StyleSheet } from "react-native-unistyles";
import { ButtonVariant } from "./button.interface";

export const buttonStyles = StyleSheet.create((theme) => ({
  container: (variant: ButtonVariant) => ({
    paddingVertical: theme.gap(1.5),
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:
      variant === "cancel"
        ? theme.colors.backgroundSecondary
        : theme.colors.primary,
  }),
  label: (variant: ButtonVariant) => ({
    fontSize: 16,
    fontFamily: theme.typography.primary.medium,
    color: variant === "cancel" ? theme.colors.text : theme.colors.background,
  }),
}));
