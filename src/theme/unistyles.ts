import { StyleSheet } from "react-native-unistyles";
import { createMMKV } from "react-native-mmkv";

export const mmkvStorage = createMMKV();

const typography = {
  primary: {
    regular: "InterRegular",
    medium: "InterMedium",
  },
  secondary: {
    bold: "DMSansBold",
  },
};

const lightTheme = {
  colors: {
    primary: "#c9f31d",
    background: "#ffffff",
    backgroundSecondary: "#f1f1f1",
    text: "#100E0E",
    textSecondary: "#888888",
    warning: "#EA580C",
    warningMuted: "#FFF7ED",
    destructive: "#DC2626",
    destructiveMuted: "#FEF2F2",
  },
  typography,
  gap: (v: number) => v * 8,
};

const darkTheme = {
  colors: {
    primary: "#c9f31d",
    background: "#0F0E0E",
    backgroundSecondary: "#1f1f1f",
    text: "#ffffff",
    textSecondary: "#b1b1b1",
    warning: "#FB923C",
    warningMuted: "#2A1A0F",
    destructive: "#F87171",
    destructiveMuted: "#2A0F0F",
  },
  typography,
  gap: (v: number) => v * 8,
};

const appThemes = {
  light: lightTheme,
  dark: darkTheme,
};

type AppThemes = typeof appThemes;

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
}

const savedTheme = mmkvStorage.getString("app_theme") as
  | "light"
  | "dark"
  | undefined;

StyleSheet.configure({
  settings: {
    initialTheme: savedTheme ?? "light",
  },
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
});
