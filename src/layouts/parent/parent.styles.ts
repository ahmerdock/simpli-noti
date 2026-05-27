import { StyleSheet } from "react-native-unistyles";

export const parentStyles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.gap(2),
  },
}));
