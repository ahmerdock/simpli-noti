import { StyleSheet } from "react-native-unistyles";

const ICON_SIZE = 20;

export const tabIconStyles = StyleSheet.create((theme) => ({
  focusedContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    minWidth: 112,
    minHeight: 54,
    marginTop: theme.gap(2),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9999,
    overflow: "hidden",
  },
  unfocusedContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.gap(2),
    borderRadius: 9999,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  iconFocused: {
    tintColor: theme.colors.text,
  },
  iconUnfocused: {
    tintColor: theme.colors.textSecondary,
  },
  label: {
    marginLeft: theme.gap(1),
    fontSize: 16,
    fontFamily: theme.typography.primary.medium,
    color: theme.colors.text,
  },
}));
