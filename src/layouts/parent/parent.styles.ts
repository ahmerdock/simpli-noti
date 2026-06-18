import { StyleSheet } from "react-native-unistyles";

export const parentStyles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.gap(2),
  },
  contentContainer: (tabBarHeight: number) => ({
    paddingTop: theme.gap(3),
    paddingBottom: tabBarHeight + theme.gap(1.5),
  }),
  contentContainerWithoutTabBar: {
    paddingTop: theme.gap(3),
    paddingBottom: theme.gap(2),
  },
  viewBox: (tabBarHeight: number) => ({
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.background,
    height: tabBarHeight + theme.gap(2),
  }),
}));
