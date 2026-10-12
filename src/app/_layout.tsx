import "@/theme/unistyles";
import "react-native-gesture-handler";

import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { DMSans_700Bold } from "@expo-google-fonts/dm-sans/700Bold";
import { Inter_400Regular } from "@expo-google-fonts/inter/400Regular";
import { Inter_500Medium } from "@expo-google-fonts/inter/500Medium";
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
    Inter_400Regular,
    Inter_500Medium,
    DMSans_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Ask for permission, then re-sync native alarms with the persisted store
  // (repairs drift from reboots, permission changes, clock changes and app
  // upgrades). The re-sync runs even if the permission step fails, and again
  // whenever the app returns to the foreground.
  useEffect(() => {
    let cancelled = false;
    let unsub: (() => void) | undefined;

    const reconcile = () => {
      const { notifications, expireNotification } =
        useNotificationStore.getState();
      NotificationService.reconcile(notifications, expireNotification).catch(
        () => {},
      );
    };

    const reconcileWhenHydrated = () => {
      if (useNotificationStore.persist.hasHydrated()) {
        reconcile();
      } else {
        unsub = useNotificationStore.persist.onFinishHydration(reconcile);
      }
    };

    reconcileWhenHydrated();
    NotificationService.ensureReady().then(() => {
      if (!cancelled) reconcile();
    });

    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active" && useNotificationStore.persist.hasHydrated()) {
        reconcile();
      }
    });

    return () => {
      cancelled = true;
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
