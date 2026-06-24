import { ParentLayout } from "@/layouts";
import { Image, Text, View } from "react-native";
import { settingsStyles } from "./settings.styles";
import Card from "@/components/card";
import { useUnistyles, UnistylesRuntime } from "react-native-unistyles";
import { MoonIcon, SunIcon } from "@/assets/icons";
import CustomSwitch from "@/components/custom-switch";
import { PAGE_TITLES } from "@/constants/routes";
import ShortHeading from "@/components/short-heading";
import { CONTACT_LINKS } from "./settings.data";
import { ContactLink } from "./components";

const Settings = () => {
  const { rt } = useUnistyles();

  const toggleTheme = () => {
    UnistylesRuntime.setTheme(rt.themeName === "light" ? "dark" : "light");
  };
  const isDark = rt.themeName === "dark";

  return (
    <ParentLayout titleProps={{ title: PAGE_TITLES.SETTINGS }}>
      <ShortHeading heading="APPEARANCE" />

      <Card>
        <View style={settingsStyles.iconWrap}>
          <Image
            source={isDark ? MoonIcon : SunIcon}
            style={{ width: 20, height: 20 }}
          />
        </View>

        <View style={settingsStyles.textWrap}>
          <Text style={settingsStyles.label}>Dark Mode</Text>
          <Text style={settingsStyles.sub}>
            {isDark ? "Currently active" : "Currently off"}
          </Text>
        </View>
        <CustomSwitch value={isDark} onValueChange={toggleTheme} />
      </Card>

      <ShortHeading heading="CONTACT ME" style={settingsStyles.contactMe} />

      {CONTACT_LINKS.map((link) => (
        <ContactLink key={link.label} {...link} />
      ))}
    </ParentLayout>
  );
};

export default Settings;
