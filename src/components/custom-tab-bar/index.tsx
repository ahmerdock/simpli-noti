import React, { useEffect, useState } from "react";
import {
  View,
  Pressable,
  Image,
  LayoutChangeEvent,
  ImageSourcePropType,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolation,
  SharedValue,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useUnistyles } from "react-native-unistyles";
import { HelpMeIcon, HomeIcon, SettingsIcon } from "@/assets/icons";

const TAB_CONFIG: Record<string, { icon: ImageSourcePropType; label: string }> =
  {
    index: { icon: HomeIcon, label: "Home" },
    "help-me": { icon: HelpMeIcon, label: "Help Me" },
    settings: { icon: SettingsIcon, label: "Settings" },
  };

interface ITabItemProps {
  icon: ImageSourcePropType;
  label: string;
  isFocused: boolean;
  onPress: () => void;
  pillX: SharedValue<number>;
  tabIndex: number;
  tabWidth: number;
}

const TabItem = (props: ITabItemProps) => {
  const { icon, label, isFocused, onPress, pillX, tabIndex, tabWidth } = props;
  const { theme } = useUnistyles();

  const labelWrapperStyle = useAnimatedStyle(() => {
    if (tabWidth === 0) return { opacity: 0, maxWidth: 0 };
    const targetX = tabIndex * tabWidth;
    const diff = Math.abs(pillX.value - targetX);
    const opacity = interpolate(
      diff,
      [0, tabWidth * 0.25],
      [1, 0],
      Extrapolation.CLAMP,
    );
    const maxWidth = interpolate(
      diff,
      [0, tabWidth * 0.25],
      [120, 0],
      Extrapolation.CLAMP,
    );
    return { opacity, maxWidth };
  });

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "transparent" }}
      style={{
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 6,
      }}
    >
      <Image
        source={icon}
        style={{
          width: 20,
          height: 20,
          tintColor: isFocused ? theme.colors.text : theme.colors.textSecondary,
        }}
      />
      {/* Animated wrapper collapses width to 0 so icon stays centered when inactive */}
      <Animated.View style={[{ overflow: "hidden" }, labelWrapperStyle]}>
        <Animated.Text
          numberOfLines={1}
          style={{
            fontSize: 14,
            fontFamily: theme.typography.primary.medium,
            color: theme.colors.text,
          }}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
};

const CustomTabBar = ({ state, navigation }: any) => {
  const { theme } = useUnistyles();
  const [tabBarWidth, setTabBarWidth] = useState(0);

  const tabCount = state.routes.length;
  const tabWidth = tabBarWidth > 0 ? tabBarWidth / tabCount : 0;

  const pillX = useSharedValue(0);

  const onLayout = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    setTabBarWidth(width);
    // Set pill position instantly on first layout without animation
    pillX.value = state.index * (width / tabCount);
  };

  useEffect(() => {
    if (tabWidth > 0) {
      pillX.value = withSpring(state.index * tabWidth, {
        damping: 18,
        stiffness: 180,
        mass: 0.7,
      });
    }
  }, [state.index, tabWidth]);

  const pillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: pillX.value }],
  }));

  const gradientColors: [string, string] = [
    theme.colors.background,
    theme.colors.primary,
  ];

  return (
    <View
      onLayout={onLayout}
      style={{
        position: "absolute",
        bottom: 36,
        left: 20,
        right: 20,
        height: 52,
        borderRadius: 50,
        backgroundColor: theme.colors.backgroundSecondary,
        borderWidth: 1,
        borderColor: theme.colors.background,
        overflow: "hidden",
        flexDirection: "row",
      }}
    >
      {/* Sliding gradient pill */}
      {tabBarWidth > 0 && (
        <Animated.View
          style={[
            {
              position: "absolute",
              top: 4,
              bottom: 4,
              left: 4,
              width: tabWidth - 8,
              borderRadius: 50,
              overflow: "hidden",
            },
            pillStyle,
          ]}
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
};

export default CustomTabBar;
