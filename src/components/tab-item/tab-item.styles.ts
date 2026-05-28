import { StyleSheet } from "react-native-unistyles";

export const tabItemStyles = StyleSheet.create((theme) => ({
  image: (focused: boolean) => ({
    width: 20,
    height: 20,
    tintColor: focused ? theme.colors.text : theme.colors.textSecondary,
  }),
  text: {
    fontSize: 14,
    fontFamily: theme.typography.primary.medium,
    color: theme.colors.text,
  },
}));
