import { NotificationService } from "@/services";
import { useNotificationStore } from "@/store";
import { BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue/400Regular";
import { DMSans_400Regular } from "@expo-google-fonts/dm-sans/400Regular";
import { DMSans_500Medium } from "@expo-google-fonts/dm-sans/500Medium";
import { DMSans_700Bold } from "@expo-google-fonts/dm-sans/700Bold";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { AppState } from "react-native";
import { useUnistyles } from "react-native-unistyles";

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
      // A failed sync is retried on the next start or foreground.
      NotificationService.reconcile(notifications, expireNotification).catch(
        () => undefined,
      );
    };

    // Reconciling an unhydrated (empty) store would cancel every armed alarm,
    // so a not-yet-hydrated store is left to the onFinishHydration path below.
    const reconcileIfHydrated = () => {
      if (useNotificationStore.persist.hasHydrated()) reconcile();
    };

    if (useNotificationStore.persist.hasHydrated()) {
      reconcile();
    } else {
      unsub = useNotificationStore.persist.onFinishHydration(reconcile);
    }

    NotificationService.ensureReady().then(() => {
      if (!cancelled) reconcileIfHydrated();
    });

    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") reconcileIfHydrated();
    });

    return () => {
      cancelled = true;
      unsub?.();
      sub.remove();
    };
  }, []);

  return {
    isReady: loaded || !!error,
    statusBarStyle: rt.themeName === "dark" ? "light" : "dark",
  } as const;
}
