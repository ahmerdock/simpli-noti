import "@/theme/unistyles";

import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ROUTE_NAMES } from "@/constants/routes";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    InterRegular: require("@/assets/fonts/Inter_18pt-Regular.ttf"),
    InterMedium: require("@/assets/fonts/Inter_18pt-Medium.ttf"),
    DMSansBold: require("@/assets/fonts/DMSans_18pt-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name={ROUTE_NAMES.TABS} options={{ headerShown: false }} />
      <Stack.Screen
        name={ROUTE_NAMES.UPSERT_NOTIFICATIONS}
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
