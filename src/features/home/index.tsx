import Plus from "lucide-react-native/icons/plus";
import { TabsLayout } from "@/layouts";
import { TouchableOpacity, View, Text } from "react-native";
import { homeStyles } from "./home.styles";
import useHome from "./use-home";
import { PAGE_TITLES } from "@/constants/routes";
import { AppIcon, ErrorAndNoData, NotificationCard } from "@/components";

export default function Home() {
  const {
    theme,
    notifications,
    active,
    disabled,
    navigateToAdd,
    navigateToEdit,
  } = useHome();

  return (
    <TabsLayout
      titleProps={{
        title: PAGE_TITLES.HOME,
        children: (
          <TouchableOpacity
            style={homeStyles.addButton}
            onPress={navigateToAdd}
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
