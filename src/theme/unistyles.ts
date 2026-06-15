import { StyleSheet } from "react-native-unistyles";

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

const breakpoints = {
  xs: 0,
  sm: 300,
  md: 500,
  lg: 800,
  xl: 1200,
};

type AppBreakpoints = typeof breakpoints;
type AppThemes = typeof appThemes;

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  settings: {
    initialTheme: "light",
  },
  breakpoints,
  themes: appThemes,
});
