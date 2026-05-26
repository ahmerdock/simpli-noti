import { StyleSheet } from "react-native-unistyles";

const lightTheme = {
  colors: {
    background: "#ffffff",
    text: "#000000",
  },
  gap: (v: number) => v * 8,
};

const darkTheme = {
  colors: {
    background: "#000000",
    text: "#ffffff",
  },
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
