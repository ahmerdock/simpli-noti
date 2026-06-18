import "@/theme/unistyles";

import CustomTabBar from "@/components/custom-tab-bar";
import { getTabBarBottomInset } from "@/constants/layout";
import { ROUTE_NAMES } from "@/constants/routes";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabsLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: getTabBarBottomInset(insets.bottom),
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen name={ROUTE_NAMES.HOME} />
      <Tabs.Screen name={ROUTE_NAMES.HELP_ME} />
      <Tabs.Screen name={ROUTE_NAMES.SETTINGS} />
    </Tabs>
  );
};

export default TabsLayout;
