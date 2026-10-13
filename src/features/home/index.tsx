import { Fragment } from "react";
import Plus from "lucide-react-native/icons/plus";
import { TabsLayout } from "@/layouts";
import { TouchableOpacity, View, Text } from "react-native";
import { homeStyles } from "./home.styles";
import useHome from "./use-home";
import { PAGE_TITLES } from "@/constants/routes";
import { AppIcon, ErrorAndNoData, NotificationCard } from "@/components";

export default function Home() {
  const { theme, notifications, sections, navigateToAdd, navigateToEdit } =
    useHome();

  return (
    <TabsLayout
      titleProps={{
        title: PAGE_TITLES.HOME,
        children: (
          <TouchableOpacity
            style={homeStyles.addButton}
            onPress={navigateToAdd}
            accessibilityRole="button"
            accessibilityLabel="Add notification"
            hitSlop={6}
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
          {sections.map(
            ({ label, items }) =>
              items.length > 0 && (
                <Fragment key={label}>
                  <Text
                    accessibilityRole="header"
                    style={homeStyles.sectionLabel}
                  >
                    {label}
                  </Text>
                  {items.map((item) => (
                    <NotificationCard
                      key={item.id}
                      item={item}
                      onPress={() => navigateToEdit(item.id)}
                    />
                  ))}
                </Fragment>
              ),
          )}
        </View>
      )}
    </TabsLayout>
  );
}
