import { PAGE_TITLES } from "@/constants/routes";
import { ParentLayout } from "@/layouts";
import { Text } from "react-native";

const HelpMe = () => {
  return (
    <ParentLayout titleProps={{ title: PAGE_TITLES.HELP_ME }}>
      <Text>Help Me</Text>
    </ParentLayout>
  );
};

export default HelpMe;
