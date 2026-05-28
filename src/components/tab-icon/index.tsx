import { View, Image } from "react-native";
import { ITabIconProps } from "./tab-icon.interface";
import { tabIconStyles } from "./tab-icon.styles";

const TabIcon = (props: ITabIconProps) => {
  const { focused, icon } = props;

  return (
    <View style={tabIconStyles.container}>
      <Image
        source={icon}
        style={[
          tabIconStyles.icon,
          focused ? tabIconStyles.iconFocused : tabIconStyles.iconUnfocused,
        ]}
      />
    </View>
  );
};

export default TabIcon;
