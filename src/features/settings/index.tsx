import { Linking } from "react-native";
import { ParentLayout } from "@/layouts";
import { useUnistyles, UnistylesRuntime } from "react-native-unistyles";
import { MoonIcon, SunIcon } from "@/assets/icons";
import ActionCard from "@/components/action-card";
import CustomSwitch from "@/components/custom-switch";
import { PAGE_TITLES } from "@/constants/routes";
import ShortHeading from "@/components/short-heading";
import { CONTACT_LINKS } from "./settings.data";
import { settingsStyles } from "./settings.styles";

const Settings = () => {
  const { rt } = useUnistyles();

  const toggleTheme = () => {
    UnistylesRuntime.setTheme(rt.themeName === "light" ? "dark" : "light");
  };
  const isDark = rt.themeName === "dark";

  return (
    <ParentLayout titleProps={{ title: PAGE_TITLES.SETTINGS }}>
      <ShortHeading heading="APPEARANCE" />

      <ActionCard
        label="Dark Mode"
        description={isDark ? "Currently active" : "Currently off"}
        icon={isDark ? MoonIcon : SunIcon}
        onPress={toggleTheme}
        trailing={<CustomSwitch value={isDark} onValueChange={toggleTheme} />}
      />

      <ShortHeading heading="CONTACT ME" style={settingsStyles.contactMe} />

      {CONTACT_LINKS.map((link) => (
        <ActionCard
          key={link.label}
          label={link.label}
          description={link.description}
          icon={link.icon}
          onPress={() => Linking.openURL(link.url)}
        />
      ))}
    </ParentLayout>
  );
};

export default Settings;
