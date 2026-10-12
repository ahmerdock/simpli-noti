import { StyleSheet } from "react-native-unistyles";

export const tabItemStyles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  labelWrapper: {
    overflow: "hidden",
  },
  text: {
    fontSize: 14,
    fontFamily: theme.typography.primary.medium,
    color: theme.colors.text,
  },
}));
