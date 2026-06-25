import { Image, Text, TouchableOpacity, View } from "react-native";
import Card from "@/components/card";
import { IActionCardProps } from "./action-card.interface";
import { actionCardStyles } from "./action-card.styles";

const ActionCard = (props: IActionCardProps) => {
  const {
    label,
    description,
    icon,
    onPress,
    disabled = false,
    trailing,
  } = props;

  const content = (
    <Card>
      <View style={actionCardStyles.iconWrap}>
        <Image source={icon} style={actionCardStyles.icon} />
      </View>

      <View style={actionCardStyles.textWrap}>
        <Text style={actionCardStyles.label}>{label}</Text>
        <Text style={actionCardStyles.description}>{description}</Text>
      </View>

      {trailing ? (
        <View style={actionCardStyles.trailingWrap}>{trailing}</View>
      ) : null}
    </Card>
  );

  if (!onPress) {
    return content;
  }

  const handlePress = () => {
    if (disabled) {
      return;
    }

    onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled}
      onPress={handlePress}
      style={disabled && { opacity: 0.5 }}
    >
      {content}
    </TouchableOpacity>
  );
};

export default ActionCard;
export { actionCardStyles } from "./action-card.styles";
