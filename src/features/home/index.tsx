import { AddIcon } from "@/assets/icons";
import ErrorAndNoData from "@/components/error-and-no-data";
import { ParentLayout } from "@/layouts";
import { Image, TouchableOpacity } from "react-native";
import { homeStyles } from "./home.styles";

const Home = () => {
  return (
    <ParentLayout
      titleProps={{
        title: "Home",
        children: (
          <TouchableOpacity style={homeStyles.addButton}>
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
