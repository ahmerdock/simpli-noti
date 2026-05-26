import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HelpMe = () => {
  return (
    <SafeAreaView edges={["top", "right", "bottom", "left"]}>
      <Text>Help Me</Text>
    </SafeAreaView>
  );
};

export default HelpMe;
