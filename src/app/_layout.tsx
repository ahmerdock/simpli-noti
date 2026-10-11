import "@/theme/unistyles";
import "react-native-gesture-handler";

import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { AppState } from "react-native";
import { ROUTE_NAMES } from "@/constants/routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { NotificationService } from "@/services/notifications";
import { useNotificationStore } from "@/store";

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

  // Ensure permission/channel and re-sync native alarms with the persisted
  // store (repairs drift from reboots, permission changes and app upgrades).
  useEffect(() => {
    let unsub: (() => void) | undefined;

    const reconcile = () =>
      NotificationService.reconcile(useNotificationStore.getState().notifications);

    (async () => {
      await NotificationService.ensureReady();
      if (useNotificationStore.persist.hasHydrated()) {
        void reconcile();
      } else {
        unsub = useNotificationStore.persist.onFinishHydration(() => {
          void reconcile();
        });
      }
    })();

    // Re-sync whenever the app returns to the foreground, so permission or
    // battery-setting changes and clock/timezone shifts are picked up.
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active" && useNotificationStore.persist.hasHydrated()) {
        void reconcile();
      }
    });

    return () => {
      unsub?.();
      sub.remove();
    };
  }, []);

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
        <Toast position="bottom" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
