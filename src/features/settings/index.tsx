import { ParentLayout } from "@/layouts";
import { Image, Text, View } from "react-native";
import { settingsStyles } from "./settings.styles";
import Card from "@/components/card";
import { useUnistyles, UnistylesRuntime } from "react-native-unistyles";
import { MoonIcon, SunIcon } from "@/assets/icons";
import CustomSwitch from "@/components/custom-switch";
import { PAGE_TITLES } from "@/constants/routes";

const Settings = () => {
  const { rt } = useUnistyles();

  const toggleTheme = () => {
    UnistylesRuntime.setTheme(rt.themeName === "light" ? "dark" : "light");
  };
  const isDark = rt.themeName === "dark";

  return (
    <ParentLayout titleProps={{ title: PAGE_TITLES.SETTINGS }}>
      <Text style={settingsStyles.appearance}>APPEARANCE</Text>

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
    </ParentLayout>
  );
};

export default Settings;
