import { Modal, Pressable, Text, View } from "react-native";
import { rhfFieldStyles } from "../react-hook-form.styles";
import { IRHFModalSheetProps } from "./rhf-modal-sheet.interface";

export default function RHFModalSheet(props: IRHFModalSheetProps) {
  const { visible, title, onClose, children } = props;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={rhfFieldStyles.modalOverlay}>
        <Pressable
          style={rhfFieldStyles.modalBackdrop}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close"
        />
        <View style={rhfFieldStyles.modalSheet}>
          <View style={rhfFieldStyles.modalHandle} />
          <Text style={rhfFieldStyles.modalTitle}>{title}</Text>
          {children}
        </View>
      </View>
    </Modal>
  );
}
