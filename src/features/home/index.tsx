import { router } from "expo-router";
import Plus from "lucide-react-native/icons/plus";
import { useUnistyles } from "react-native-unistyles";
import { TabsLayout } from "@/layouts";
import { TouchableOpacity, View, Text } from "react-native";
import { homeStyles } from "./home.styles";
import { PAGE_TITLES, ROUTES } from "@/constants/routes";
import { useNotificationStore } from "@/store";
import { AppIcon, ErrorAndNoData, NotificationCard } from "@/components";

export default function Home() {
  const { theme } = useUnistyles();
  const notifications = useNotificationStore((s) => s.notifications);

  const active = notifications.filter((n) => n.isActive);
  const disabled = notifications.filter((n) => !n.isActive);

  const navigateToEdit = (id: string) =>
    router.push(`${ROUTES.UPSERT_NOTIFICATIONS}?id=${id}`);

  return (
    <TabsLayout
      titleProps={{
        title: PAGE_TITLES.HOME,
        children: (
          <TouchableOpacity
            style={homeStyles.addButton}
            onPress={() => router.push(ROUTES.UPSERT_NOTIFICATIONS)}
          >
            <AppIcon icon={Plus} size={24} color={theme.colors.onPrimary} />
          </TouchableOpacity>
        ),
      }}
    >
      {notifications.length === 0 ? (
        <ErrorAndNoData
          message="No notifications yet"
          description="Tap + to add your first one"
        />
      ) : (
        <View style={homeStyles.listContent}>
          {active.length > 0 && (
            <>
              <Text style={homeStyles.sectionLabel}>ACTIVE</Text>
              {active.map((item) => (
                <NotificationCard
                  key={item.id}
                  item={item}
                  onPress={() => navigateToEdit(item.id)}
                />
              ))}
            </>
          )}

          {disabled.length > 0 && (
            <>
              <Text style={homeStyles.sectionLabel}>DISABLED</Text>
              {disabled.map((item) => (
                <NotificationCard
                  key={item.id}
                  item={item}
                  onPress={() => navigateToEdit(item.id)}
                />
              ))}
            </>
          )}
        </View>
      )}
    </TabsLayout>
  );
}
