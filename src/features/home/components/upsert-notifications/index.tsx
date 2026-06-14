import { Modal, Pressable, Text, View } from "react-native";
import { IUpsertNotificationsProps } from "./upsert-notifications.interface";
import { upsertNotificationsStyles } from "./upsert-notifications.styles";

const UpsertNotifications = (props: IUpsertNotificationsProps) => {
  const { visible, onClose } = props;

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <View style={upsertNotificationsStyles.backdrop}>
        <Pressable
          style={upsertNotificationsStyles.backdropPressable}
          onPress={handleCancel}
        />
        <View style={upsertNotificationsStyles.card}>
          <Text style={upsertNotificationsStyles.title}>Add notification</Text>

          <View style={upsertNotificationsStyles.actions}>
            <Pressable
              style={upsertNotificationsStyles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={upsertNotificationsStyles.cancelButtonText}>
                Cancel
              </Text>
            </Pressable>
            <Pressable
              style={upsertNotificationsStyles.saveButton}
              onPress={() => {}}
            >
              <Text style={upsertNotificationsStyles.saveButtonText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UpsertNotifications;
