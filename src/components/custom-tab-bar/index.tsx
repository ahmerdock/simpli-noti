import { View } from "react-native";
import Animated from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TabItem from "../tab-item";
import { TAB_BAR_HEIGHT, TAB_BAR_MARGIN } from "@/constants/layout";
import { ICustomTabBarProps } from "./custom-tab-bar.interface";
import { customTabBarStyles } from "./custom-tab-bar.styles";
import useCustomTabBar from "./use-custom-tab-bar";
import { TAB_CONFIG } from "./custom-tab-bar.utils";

export default function CustomTabBar(props: ICustomTabBarProps) {
  const { state, navigation } = props;
  const insets = useSafeAreaInsets();

  const { tabBarWidth, pillX, tabWidth, pillStyle, gradientColors, onLayout } =
    useCustomTabBar(props);

  return (
    <View
      onLayout={onLayout}
      style={[
        customTabBarStyles.container,
        {
          bottom: insets.bottom + TAB_BAR_MARGIN,
          height: TAB_BAR_HEIGHT,
        },
      ]}
    >
      {/* Sliding gradient pill */}
      {tabBarWidth > 0 && (
        <Animated.View
          style={[customTabBarStyles.viewPill(tabWidth), pillStyle]}
        >
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ flex: 1 }}
          />
        </Animated.View>
      )}

      {/* Tab items rendered on top of the pill */}
      {state.routes.map((route: any, index: number) => {
        const config = TAB_CONFIG[route.name];
        if (!config) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabItem
            key={route.key}
            icon={config.icon}
            label={config.label}
            isFocused={isFocused}
            onPress={onPress}
            pillX={pillX}
            tabIndex={index}
            tabWidth={tabWidth}
          />
        );
      })}
    </View>
  );
}
