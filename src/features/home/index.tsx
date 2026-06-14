import { router } from "expo-router";
import { AddIcon } from "@/assets/icons";
import ErrorAndNoData from "@/components/error-and-no-data";
import { ParentLayout } from "@/layouts";
import { Image, TouchableOpacity } from "react-native";
import { homeStyles } from "./home.styles";
import { PAGE_TITLES, ROUTES } from "@/constants/routes";

const Home = () => {
  return (
    <ParentLayout
      titleProps={{
        title: PAGE_TITLES.HOME,
        children: (
          <TouchableOpacity
            style={homeStyles.addButton}
            onPress={() => router.push(ROUTES.UPSERT_NOTIFICATIONS)}
          >
            <Image source={AddIcon} style={homeStyles.addButtonIcon} />
          </TouchableOpacity>
        ),
      }}
    >
      <ErrorAndNoData
        message="No notifications yet"
        description="Tap + to add your first one"
      />
    </ParentLayout>
  );
};

export default Home;
