import { StyleSheet } from "react-native-unistyles";

export const notificationCardStyles = StyleSheet.create((theme) => ({
  card: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 14,
    padding: theme.gap(1.5),
    gap: theme.gap(0.75),
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.gap(1),
  },
  cardTitle: {
    flex: 1,
    fontSize: 15,
    fontFamily: theme.typography.body.medium,
    color: theme.colors.text,
  },
  repeatBadge: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    paddingHorizontal: theme.gap(1),
    paddingVertical: 3,
  },
  repeatBadgeText: {
    fontSize: 11,
    fontFamily: theme.typography.body.medium,
    color: theme.colors.onPrimary,
  },
  cardDateTime: {
    fontSize: 13,
    fontFamily: theme.typography.body.bold,
    color: theme.colors.textSecondary,
  },
  cardDescription: {
    fontSize: 12,
    fontFamily: theme.typography.body.regular,
    color: theme.colors.textSecondary,
  },
}));
