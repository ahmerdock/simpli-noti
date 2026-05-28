import { Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { ICustomSwitchProps } from "./custom-switch.interface";
import useCustomSwitch from "./use-custom-switch";

const CustomSwitch = (props: ICustomSwitchProps) => {
  const { value } = props;

  const { toggleSwitch, thumbStyle } = useCustomSwitch(props);

  return (
    <Pressable
      onPress={toggleSwitch}
      style={{
        width: 44,
        height: 26,
        borderRadius: 13,
        padding: 3,
        backgroundColor: value ? "#c9f31d" : "#100E0E",
        justifyContent: "center",
      }}
    >
      <Animated.View
        style={[
          {
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: "#ffffff",
          },
          thumbStyle,
        ]}
      />
    </Pressable>
  );
};

export default CustomSwitch;
