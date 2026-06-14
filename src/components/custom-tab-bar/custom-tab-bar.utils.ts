import { ImageSourcePropType } from "react-native";
import { HelpMeIcon, HomeIcon, SettingsIcon } from "@/assets/icons";
import { PAGE_TITLES, ROUTE_NAMES } from "@/constants/routes";

export const TAB_CONFIG: Record<
  string,
  { icon: ImageSourcePropType; label: string }
> = {
  [ROUTE_NAMES.HOME]: { icon: HomeIcon, label: PAGE_TITLES.HOME },
  [ROUTE_NAMES.HELP_ME]: { icon: HelpMeIcon, label: PAGE_TITLES.HELP_ME },
  [ROUTE_NAMES.SETTINGS]: { icon: SettingsIcon, label: PAGE_TITLES.SETTINGS },
};
