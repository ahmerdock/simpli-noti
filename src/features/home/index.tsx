import { router } from "expo-router";
import { AddIcon } from "@/assets/icons";
import ErrorAndNoData from "@/components/error-and-no-data";
import { ParentLayout } from "@/layouts";
import { Image, TouchableOpacity, View, Text } from "react-native";
import { homeStyles } from "./home.styles";
import { PAGE_TITLES, ROUTES } from "@/constants/routes";
import { useNotificationStore } from "@/store";
import NotificationCard from "@/components/notification-card";

const Home = () => {
  const notifications = useNotificationStore((s) => s.notifications);

  const active = notifications.filter((n) => n.isActive);
  const disabled = notifications.filter((n) => !n.isActive);

  const navigateToEdit = (id: string) =>
    router.push(`${ROUTES.UPSERT_NOTIFICATIONS}?id=${id}`);

  return (
    <ParentLayout
      titleProps={{
        title: PAGE_TITLES.HOME,
        children: (
          <TouchableOpacity
            style={homeStyles.addButton}
            onPress={() => router.push(ROUTES.UPSERT_NOTIFICATIONS)}
          >
            <Image source={AddIcon} style={homeStyles.addButtonIcon} />
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
    </ParentLayout>
  );
};

export default Home;
