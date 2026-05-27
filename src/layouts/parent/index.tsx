import { View, ScrollView } from "react-native";
import { parentStyles } from "./parent.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { IParentLayoutProps } from "./parent.interface";
import ScreenTitle from "@/components/screen-title";

const ParentLayout = (props: IParentLayoutProps) => {
  const { children, titleProps } = props;

  return (
    <View style={parentStyles.container}>
      <SafeAreaView
        edges={["top", "right", "bottom", "left"]}
        style={{ flex: 1 }}
      >
        <ScreenTitle {...titleProps} />

        <ScrollView>{children}</ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ParentLayout;
