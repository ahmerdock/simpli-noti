import { router } from "expo-router";
import { useUnistyles } from "react-native-unistyles";
import { ROUTES } from "@/constants/routes";
import { useNotificationStore } from "@/store";

export default function useHome() {
  const { theme } = useUnistyles();
  const notifications = useNotificationStore((s) => s.notifications);

  const sections = [
    { label: "ACTIVE", items: notifications.filter((n) => n.isActive) },
    { label: "DISABLED", items: notifications.filter((n) => !n.isActive) },
  ];

  const navigateToAdd = () => router.push(ROUTES.UPSERT_NOTIFICATIONS);

  const navigateToEdit = (id: string) =>
    router.push(`${ROUTES.UPSERT_NOTIFICATIONS}?id=${id}`);

  return {
    theme,
    notifications,
    sections,
    navigateToAdd,
    navigateToEdit,
  };
}
