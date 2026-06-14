import { useState } from "react";
import { AddIcon } from "@/assets/icons";
import ErrorAndNoData from "@/components/error-and-no-data";
import { ParentLayout } from "@/layouts";
import { Image, TouchableOpacity } from "react-native";
import { UpsertNotifications } from "./components";
import { homeStyles } from "./home.styles";

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <ParentLayout
        titleProps={{
          title: "Home",
          children: (
            <TouchableOpacity
              style={homeStyles.addButton}
              onPress={() => setIsModalVisible(true)}
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

      <UpsertNotifications
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
};

export default Home;
