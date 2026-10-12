import { router } from "expo-router";
import { useUnistyles } from "react-native-unistyles";
import { ROUTES } from "@/constants/routes";
import { useNotificationStore } from "@/store";

export default function useHome() {
  const { theme } = useUnistyles();
  const notifications = useNotificationStore((s) => s.notifications);

  const active = notifications.filter((n) => n.isActive);
  const disabled = notifications.filter((n) => !n.isActive);

  const navigateToAdd = () => router.push(ROUTES.UPSERT_NOTIFICATIONS);

  const navigateToEdit = (id: string) =>
    router.push(`${ROUTES.UPSERT_NOTIFICATIONS}?id=${id}`);

  return {
    theme,
    notifications,
    active,
    disabled,
    navigateToAdd,
    navigateToEdit,
  };
}
