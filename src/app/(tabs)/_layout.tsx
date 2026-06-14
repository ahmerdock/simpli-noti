import "@/theme/unistyles";

import CustomTabBar from "@/components/custom-tab-bar";
import { Tabs } from "expo-router";
import { ROUTE_NAMES } from "@/constants/routes";

const TabsLayout = () => {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name={ROUTE_NAMES.HOME} />
      <Tabs.Screen name={ROUTE_NAMES.HELP_ME} />
      <Tabs.Screen name={ROUTE_NAMES.SETTINGS} />
    </Tabs>
  );
};

export default TabsLayout;
