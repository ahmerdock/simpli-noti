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
    primary: "#b63331",
    background: "#FDFDFD",
    backgroundSecondary: "#F0F0F0",
    text: "#121212",
    textSecondary: "#12121280",
    onPrimary: "#FDFDFD",
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
    primary: "#b63331",
    background: "#0D0C0C",
    backgroundSecondary: "#1C1C1C",
    text: "#FDFDFD",
    textSecondary: "#FDFDFD80",
    onPrimary: "#FDFDFD",
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
