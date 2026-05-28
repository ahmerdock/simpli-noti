import { ParentLayout } from "@/layouts";
import { Text } from "react-native";

const Home = () => {
  return (
    <ParentLayout titleProps={{ title: "Home" }}>
      <Text>Home</Text>
    </ParentLayout>
  );
};

export default Home;
