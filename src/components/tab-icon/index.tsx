import { View, Text, ImageBackground, Image } from "react-native";
import { ITabIconProps } from "./tab-icon.interface";
import { tabIconStyles } from "./tab-icon.styles";
import { useUnistyles } from "react-native-unistyles";
import { HighlightLightImg, HighlightDarkImg } from "@/assets/images";

const TabIcon = (props: ITabIconProps) => {
  const { focused, icon, title } = props;

  const { rt } = useUnistyles();

  const HighlightImg =
    rt.themeName === "light" ? HighlightLightImg : HighlightDarkImg;

  if (focused) {
    return (
      <ImageBackground
        source={HighlightImg}
        style={tabIconStyles.focusedContainer}
      >
        <Image
          source={icon}
          style={[tabIconStyles.icon, tabIconStyles.iconFocused]}
        />
        <Text style={tabIconStyles.label}>{title}</Text>
      </ImageBackground>
    );
  }

  return (
    <View style={tabIconStyles.unfocusedContainer}>
      <Image
        source={icon}
        style={[tabIconStyles.icon, tabIconStyles.iconUnfocused]}
      />
    </View>
  );
};

export default TabIcon;
