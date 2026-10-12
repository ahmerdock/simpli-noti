import { StyleSheet } from "react-native-unistyles";

export const upsertNotificationsStyles = StyleSheet.create((theme) => ({
  actions: {
    flexDirection: "row",
    gap: theme.gap(1.5),
    marginTop: theme.gap(1),
  },
  actionButton: {
    flex: 1,
  },
  form: {
    gap: theme.gap(2),
    paddingTop: theme.gap(1),
  },
  dateTimeRow: {
    flexDirection: "row",
    gap: theme.gap(1.5),
  },
  dateTimeField: {
    flex: 1,
  },
}));
