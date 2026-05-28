import "@/theme/unistyles";

import CustomTabBar from "@/components/custom-tab-bar";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="help-me" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
};

export default TabsLayout;
