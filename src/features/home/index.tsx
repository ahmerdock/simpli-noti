import { router } from "expo-router";
import { AddIcon } from "@/assets/icons";
import ErrorAndNoData from "@/components/error-and-no-data";
import { ParentLayout } from "@/layouts";
import { Image, TouchableOpacity, View, Text } from "react-native";
import { homeStyles } from "./home.styles";
import { PAGE_TITLES, ROUTES } from "@/constants/routes";
import { useNotificationStore } from "@/store";
import { formatNotificationDateTime } from "@/utils/date-time-display";

const Home = () => {
  const notifications = useNotificationStore((s) => s.notifications);

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
          {notifications.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={homeStyles.card}
              onPress={() =>
                router.push(`${ROUTES.UPSERT_NOTIFICATIONS}?id=${item.id}`)
              }
            >
              <View style={homeStyles.cardHeader}>
                <Text style={homeStyles.cardTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                {item.repeat !== "none" && (
                  <View style={homeStyles.repeatBadge}>
                    <Text style={homeStyles.repeatBadgeText}>
                      {item.repeat.charAt(0).toUpperCase() +
                        item.repeat.slice(1)}
                    </Text>
                  </View>
                )}
              </View>
              <Text style={homeStyles.cardDateTime}>
                {formatNotificationDateTime(item)}
              </Text>
              {item.description ? (
                <Text style={homeStyles.cardDescription} numberOfLines={2}>
                  {item.description}
                </Text>
              ) : null}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ParentLayout>
  );
};

export default Home;
