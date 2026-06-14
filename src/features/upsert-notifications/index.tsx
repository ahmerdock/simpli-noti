import { router } from "expo-router";
import { ParentLayout } from "@/layouts";
import { Pressable, Text, View } from "react-native";
import { upsertNotificationsStyles } from "./upsert-notifications.styles";
import { PAGE_TITLES } from "@/constants/routes";

const UpsertNotifications = () => {
  const handleCancel = () => {
    router.back();
  };

  return (
    <ParentLayout
      includeTabBarPadding={false}
      titleProps={{ title: PAGE_TITLES.ADD_NOTIFICATION }}
    >
      <View style={upsertNotificationsStyles.actions}>
        <Pressable
          style={upsertNotificationsStyles.cancelButton}
          onPress={handleCancel}
        >
          <Text style={upsertNotificationsStyles.cancelButtonText}>Cancel</Text>
        </Pressable>
        <Pressable
          style={upsertNotificationsStyles.saveButton}
          onPress={() => {}}
        >
          <Text style={upsertNotificationsStyles.saveButtonText}>Save</Text>
        </Pressable>
      </View>
    </ParentLayout>
  );
};

export default UpsertNotifications;
