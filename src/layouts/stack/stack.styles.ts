import { StyleSheet } from "react-native-unistyles";

export const stackStyles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.gap(2),
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: theme.gap(3),
    paddingBottom: theme.gap(2),
  },
}));
