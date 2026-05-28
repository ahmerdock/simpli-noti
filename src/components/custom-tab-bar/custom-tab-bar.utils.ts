import { ImageSourcePropType } from "react-native";
import { HelpMeIcon, HomeIcon, SettingsIcon } from "@/assets/icons";

export const TAB_CONFIG: Record<
  string,
  { icon: ImageSourcePropType; label: string }
> = {
  index: { icon: HomeIcon, label: "Home" },
  "help-me": { icon: HelpMeIcon, label: "Help Me" },
  settings: { icon: SettingsIcon, label: "Settings" },
};
