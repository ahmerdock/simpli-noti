import { View, ScrollView } from "react-native";
import { parentStyles } from "./parent.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { IParentLayoutProps } from "./parent.interface";
import ScreenTitle from "@/components/screen-title";
import { useBottomTabBarHeight } from "expo-router/build/react-navigation/bottom-tabs";
import { ReactNode } from "react";
import { IScreenTitleProps } from "@/components/screen-title/screen-title.interface";

interface IParentLayoutContentProps {
  children: ReactNode;
  titleProps: IScreenTitleProps;
}

const ParentLayoutWithTabBar = (props: IParentLayoutContentProps) => {
  const { children, titleProps } = props;
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <>
      <ScreenTitle {...titleProps} />

      <ScrollView
        contentContainerStyle={parentStyles.contentContainer(tabBarHeight)}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
      <View pointerEvents="none" style={parentStyles.viewBox(tabBarHeight)} />
    </>
  );
};

const ParentLayoutWithoutTabBar = (props: IParentLayoutContentProps) => {
  const { children, titleProps } = props;

  return (
    <>
      <ScreenTitle {...titleProps} />

      <ScrollView
        contentContainerStyle={parentStyles.contentContainerWithoutTabBar}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </>
  );
};

const ParentLayout = (props: IParentLayoutProps) => {
  const { children, titleProps, includeTabBarPadding = true } = props;

  return (
    <View style={parentStyles.container}>
      <SafeAreaView
        edges={["top", "right", "bottom", "left"]}
        style={{ flex: 1 }}
      >
        {includeTabBarPadding ? (
          <ParentLayoutWithTabBar titleProps={titleProps}>
            {children}
          </ParentLayoutWithTabBar>
        ) : (
          <ParentLayoutWithoutTabBar titleProps={titleProps}>
            {children}
          </ParentLayoutWithoutTabBar>
        )}
      </SafeAreaView>
    </View>
  );
};

export default ParentLayout;
