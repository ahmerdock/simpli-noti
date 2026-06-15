import { StyleSheet } from "react-native-unistyles";
import { ITEM_HEIGHT, PICKER_HEIGHT } from "./wheel-column.utils";

export const wheelColumnStyles = StyleSheet.create((theme) => ({
  container: {
    height: PICKER_HEIGHT,
    flex: 1,
    minWidth: 56,
  },
  highlightBar: {
    position: "absolute",
    top: ITEM_HEIGHT * 2,
    left: 4,
    right: 4,
    height: ITEM_HEIGHT,
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    opacity: 0.15,
    zIndex: 1,
  },
  scrollContent: {
    paddingVertical: ITEM_HEIGHT * 2,
  },
  item: {
    height: ITEM_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: (isSelected: boolean) => ({
    fontSize: isSelected ? 20 : 16,
    fontFamily: isSelected
      ? theme.typography.primary.medium
      : theme.typography.primary.regular,
    color: isSelected ? theme.colors.text : theme.colors.textSecondary,
  }),
}));
