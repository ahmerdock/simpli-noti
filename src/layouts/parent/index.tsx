import { View, ScrollView } from "react-native";
import { parentStyles } from "./parent.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { IParentLayoutProps } from "./parent.interface";
import ScreenTitle from "@/components/screen-title";
import { useBottomTabBarHeight } from "expo-router/build/react-navigation/bottom-tabs";

const ParentLayout = (props: IParentLayoutProps) => {
  const { children, titleProps } = props;

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={parentStyles.container}>
      <SafeAreaView
        edges={["top", "right", "bottom", "left"]}
        style={{ flex: 1 }}
      >
        <ScreenTitle {...titleProps} />

        <ScrollView
          contentContainerStyle={parentStyles.contentContainer(tabBarHeight)}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
        <View pointerEvents="none" style={parentStyles.viewBox(tabBarHeight)} />
      </SafeAreaView>
    </View>
  );
};

export default ParentLayout;
