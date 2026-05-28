import { ITabItemProps } from "./tab-item.interface";
import { Pressable, Image } from "react-native";
import Animated from "react-native-reanimated";
import useTabItem from "./use-tab-item";
import { tabItemStyles } from "./tab-item.styles";

const TabItem = (props: ITabItemProps) => {
  const { icon, label, isFocused, onPress } = props;

  const { labelWrapperStyle } = useTabItem(props);

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "transparent" }}
      style={{
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 6,
      }}
    >
      <Image source={icon} style={tabItemStyles.image(isFocused)} />
      {/* Animated wrapper collapses width to 0 so icon stays centered when inactive */}
      <Animated.View style={[{ overflow: "hidden" }, labelWrapperStyle]}>
        <Animated.Text numberOfLines={1} style={tabItemStyles.text}>
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
};

export default TabItem;
