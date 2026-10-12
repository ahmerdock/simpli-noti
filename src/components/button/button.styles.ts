import { StyleSheet } from "react-native-unistyles";
import { ButtonVariant } from "./button.interface";

const containerBackground: Record<
  ButtonVariant,
  (theme: { colors: Record<string, string> }) => string
> = {
  cancel: (theme) => theme.colors.backgroundSecondary,
  submit: (theme) => theme.colors.primary,
  disable: (theme) => theme.colors.warningMuted,
  delete: (theme) => theme.colors.destructiveMuted,
};

const labelColor: Record<
  ButtonVariant,
  (theme: { colors: Record<string, string> }) => string
> = {
  cancel: (theme) => theme.colors.text,
  submit: (theme) => theme.colors.onPrimary,
  disable: (theme) => theme.colors.warning,
  delete: (theme) => theme.colors.destructive,
};

export const buttonStyles = StyleSheet.create((theme) => ({
  container: (variant: ButtonVariant) => ({
    paddingVertical: theme.gap(1.5),
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: containerBackground[variant](theme),
  }),
  label: (variant: ButtonVariant) => ({
    fontSize: 16,
    fontFamily: theme.typography.primary.medium,
    color: labelColor[variant](theme),
  }),
}));
