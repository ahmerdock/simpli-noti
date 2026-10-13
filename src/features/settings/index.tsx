import { Platform } from "react-native";
import { TabsLayout } from "@/layouts";
import BatteryCharging from "lucide-react-native/icons/battery-charging";
import Moon from "lucide-react-native/icons/moon";
import Sun from "lucide-react-native/icons/sun";
import { ActionCard, CustomSwitch, ShortHeading } from "@/components";
import { PAGE_TITLES } from "@/constants/routes";
import { CONTACT_LINKS } from "./settings.data";
import { settingsStyles } from "./settings.styles";
import useSettings from "./use-settings";

export default function Settings() {
  const { isDark, toggleTheme, openLink, openBatterySettings } = useSettings();

  return (
    <TabsLayout titleProps={{ title: PAGE_TITLES.SETTINGS }}>
      <ShortHeading heading="APPEARANCE" />

      <ActionCard
        label="Dark Mode"
        description={isDark ? "Currently active" : "Currently off"}
        icon={isDark ? Moon : Sun}
        accessibilityRole="switch"
        checked={isDark}
        onPress={toggleTheme}
        trailing={
          <CustomSwitch
            value={isDark}
            onValueChange={toggleTheme}
            accessibilityLabel="Dark Mode"
          />
        }
      />

      {Platform.OS === "android" && (
        <>
          <ShortHeading
            heading="RELIABILITY"
            style={settingsStyles.sectionHeading}
          />
          <ActionCard
            label="Allow background activity"
            description="Stops the phone from delaying reminders"
            icon={BatteryCharging}
            onPress={openBatterySettings}
          />
        </>
      )}

      <ShortHeading
        heading="CONTACT ME"
        style={settingsStyles.sectionHeading}
      />

      {CONTACT_LINKS.map((link) => (
        <ActionCard
          key={link.label}
          label={link.label}
          description={link.description}
          icon={link.icon}
          accessibilityRole="link"
          onPress={() => openLink(link.url)}
        />
      ))}
    </TabsLayout>
  );
}
