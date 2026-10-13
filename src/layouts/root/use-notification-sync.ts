import { useEffect } from "react";
import { AppState } from "react-native";
import { NotificationService } from "@/services";
import { useNotificationStore } from "@/store";

// Ask for permission, then re-sync native alarms with the persisted store
// (repairs drift from reboots, permission changes, clock changes and app
// upgrades). The re-sync runs even if the permission step fails, and again
// whenever the app returns to the foreground.
export default function useNotificationSync() {
  useEffect(() => {
    let cancelled = false;
    let isRunning = false;
    let isRerunRequested = false;
    let unsub: (() => void) | undefined;

    // One re-sync at a time. A request that arrives mid-run, or a store change
    // made during it, queues one more run on fresh data, so a reminder deleted
    // mid-run cannot be re-armed from the older snapshot.
    const reconcile = () => {
      if (isRunning) {
        isRerunRequested = true;
        return;
      }

      isRunning = true;
      isRerunRequested = false;
      const snapshot = useNotificationStore.getState();

      // A failed sync is retried on the next start or foreground.
      NotificationService.reconcile(
        snapshot.notifications,
        snapshot.expireNotification,
      )
        .catch(() => undefined)
        .finally(() => {
          isRunning = false;
          const storeChanged =
            useNotificationStore.getState().notifications !==
            snapshot.notifications;

          if (!cancelled && (isRerunRequested || storeChanged)) {
            reconcile();
          }
        });
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
}
