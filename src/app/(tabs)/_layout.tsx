import "@/theme/unistyles";

import { HelpMeIcon, HomeIcon, SettingsIcon } from "@/assets/icons";
import TabIcon from "@/components/tab-icon";
import { Tabs } from "expo-router";
import { useUnistyles } from "react-native-unistyles";
import { PlatformPressable } from "expo-router/build/react-navigation";

const TabsLayout = () => {
  const { theme } = useUnistyles();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarButton: (props) => (
          <PlatformPressable
            {...props}
            pressColor="transparent"
            pressOpacity={1}
            android_ripple={{ color: "transparent" }}
          />
        ),
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: theme.colors.backgroundSecondary,
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: theme.colors.background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={HomeIcon} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="help-me"
        options={{
          title: "Help Me",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={HelpMeIcon} title="Help Me" />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={SettingsIcon} title="Settings" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
