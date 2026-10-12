import { StyleSheet } from "react-native-unistyles";
import { createMMKV } from "react-native-mmkv";
import { THEME_STORAGE_KEY } from "@/constants/storage";

export const mmkvStorage = createMMKV();

const typography = {
  primary: {
    regular: "Inter_400Regular",
    medium: "Inter_500Medium",
  },
  secondary: {
    bold: "DMSans_700Bold",
  },
};

const lightTheme = {
  colors: {
    primary: "#b63331",
    background: "#FDFDFD",
    backgroundSecondary: "#F0F0F0",
    text: "#121212",
    textSecondary: "#12121299",
    onPrimary: "#FDFDFD",
    warning: "#C2410C",
    warningMuted: "#FFF7ED",
    destructive: "#B91C1C",
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
  // Unistyles requires an interface here to add our themes to its types.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesThemes extends AppThemes {}
}

const storedTheme = mmkvStorage.getString(THEME_STORAGE_KEY);
const savedTheme =
  storedTheme === "light" || storedTheme === "dark" ? storedTheme : undefined;

StyleSheet.configure({
  settings: {
    initialTheme: savedTheme ?? "dark",
  },
  themes: appThemes,
});
