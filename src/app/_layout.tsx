import "@/theme/unistyles";
import "react-native-gesture-handler";

import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ROUTE_NAMES } from "@/constants/routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ToastManager from "toastify-react-native";

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
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen
            name={ROUTE_NAMES.TABS}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={ROUTE_NAMES.UPSERT_NOTIFICATIONS}
            options={{ headerShown: false }}
          />
        </Stack>
        <ToastManager />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
