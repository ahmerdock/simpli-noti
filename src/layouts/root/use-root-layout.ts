import { NotificationService } from "@/services";
import { useNotificationStore } from "@/store";
import { DMSans_700Bold } from "@expo-google-fonts/dm-sans/700Bold";
import { Inter_400Regular } from "@expo-google-fonts/inter/400Regular";
import { Inter_500Medium } from "@expo-google-fonts/inter/500Medium";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { AppState } from "react-native";
import { useUnistyles } from "react-native-unistyles";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function useRootLayout() {
  const { rt } = useUnistyles();

  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    DMSans_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync().catch(() => {});
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

  return {
    isReady: loaded || !!error,
    statusBarStyle: rt.themeName === "dark" ? "light" : "dark",
  } as const;
}
