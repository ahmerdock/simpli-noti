import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView edges={["top", "right", "bottom", "left"]}>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default Home;
