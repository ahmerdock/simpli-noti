import { View, Text } from "react-native";
import { parentStyles } from "./parent.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { IParentLayoutProps } from "./parent.interface";

const ParentLayout = (props: IParentLayoutProps) => {
  const { children } = props;

  return (
    <View style={parentStyles.container}>
      <SafeAreaView
        edges={["top", "right", "bottom", "left"]}
        style={{ flex: 1 }}
      >
        {children}
      </SafeAreaView>
    </View>
  );
};

export default ParentLayout;
