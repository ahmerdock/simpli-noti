import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  return (
    <SafeAreaView edges={["top", "right", "bottom", "left"]}>
      <Text>Settings</Text>
    </SafeAreaView>
  );
};

export default Settings;
