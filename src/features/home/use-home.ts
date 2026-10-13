import { router } from "expo-router";
import { useSyncExternalStore } from "react";
import { useUnistyles } from "react-native-unistyles";
import { ROUTES } from "@/constants/routes";
import { useNotificationStore } from "@/store";

export default function useHome() {
  const { theme } = useUnistyles();
  const notifications = useNotificationStore((s) => s.notifications);

  // Saved reminders load asynchronously; until then the list is not known to be
  // empty, so the "No notifications yet" state must not show.
  const isHydrated = useSyncExternalStore(
    useNotificationStore.persist.onFinishHydration,
    useNotificationStore.persist.hasHydrated,
  );

  const hydrationFailed = useNotificationStore((s) => s.hydrationFailed);

  const sections = [
    { label: "ACTIVE", items: notifications.filter((n) => n.isActive) },
    { label: "DISABLED", items: notifications.filter((n) => !n.isActive) },
  ];

  const navigateToAdd = () => router.push(ROUTES.UPSERT_NOTIFICATIONS);

  const navigateToEdit = (id: string) =>
    router.push(`${ROUTES.UPSERT_NOTIFICATIONS}?id=${id}`);

  return {
    theme,
    isHydrated,
    hydrationFailed,
    notifications,
    sections,
    navigateToAdd,
    navigateToEdit,
  };
}
