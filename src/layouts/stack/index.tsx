import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenTitle } from "@/components";
import { IStackLayoutProps } from "./stack.interface";
import { stackStyles } from "./stack.styles";

export default function StackLayout(props: IStackLayoutProps) {
  const { children, titleProps } = props;

  return (
    <View style={stackStyles.container}>
      <SafeAreaView
        edges={["top", "right", "bottom", "left"]}
        style={stackStyles.safeArea}
      >
        <ScreenTitle {...titleProps} />

        <ScrollView
          contentContainerStyle={stackStyles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
