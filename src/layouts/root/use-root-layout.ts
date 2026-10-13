import { BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue/400Regular";
import { DMSans_400Regular } from "@expo-google-fonts/dm-sans/400Regular";
import { DMSans_500Medium } from "@expo-google-fonts/dm-sans/500Medium";
import { DMSans_700Bold } from "@expo-google-fonts/dm-sans/700Bold";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useUnistyles } from "react-native-unistyles";
import useNotificationSync from "./use-notification-sync";

// A failed splash call must not become an unhandled rejection; the app still runs.
SplashScreen.preventAutoHideAsync().catch(() => undefined);

export default function useRootLayout() {
  const { rt } = useUnistyles();

  const [loaded, error] = useFonts({
    BebasNeue_400Regular,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync().catch(() => undefined);
    }
  }, [loaded, error]);

  useNotificationSync();

  return {
    isReady: loaded || !!error,
    statusBarStyle: rt.themeName === "dark" ? "light" : "dark",
  } as const;
}
