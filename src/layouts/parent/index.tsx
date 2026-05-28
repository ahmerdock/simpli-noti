import { View, ScrollView } from "react-native";
import { parentStyles } from "./parent.styles";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { IParentLayoutProps } from "./parent.interface";
import ScreenTitle from "@/components/screen-title";
import { useBottomTabBarHeight } from "expo-router/build/react-navigation/bottom-tabs";

const ParentLayout = (props: IParentLayoutProps) => {
  const { children, titleProps } = props;

  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();

  return (
    <View style={parentStyles.container}>
      <SafeAreaView
        edges={["top", "right", "bottom", "left"]}
        style={{ flex: 1 }}
      >
        <ScreenTitle {...titleProps} />

        <ScrollView
          contentContainerStyle={{
            paddingBottom: tabBarHeight + 12,
          }}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ParentLayout;
