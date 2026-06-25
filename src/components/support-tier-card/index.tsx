import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "@/components/card";
import { ISupportTierCardProps } from "./support-tier-card.interface";
import { supportTierCardStyles } from "./support-tier-card.styles";

const SupportTierCard = (props: ISupportTierCardProps) => {
  const {
    label,
    description,
    icon,
    displayPrice,
    isPurchasing,
    disabled,
    onPress,
  } = props;

  const isInteractionDisabled = disabled || isPurchasing;

  const handlePress = () => {
    if (isInteractionDisabled) {
      return;
    }

    onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isInteractionDisabled}
      onPress={handlePress}
      style={disabled && { opacity: 0.5 }}
    >
      <Card>
        <View style={supportTierCardStyles.iconWrap}>
          <Image source={icon} style={supportTierCardStyles.icon} />
        </View>

        <View style={supportTierCardStyles.textWrap}>
          <Text style={supportTierCardStyles.label}>{label}</Text>
          <Text style={supportTierCardStyles.description}>{description}</Text>
        </View>

        <View style={supportTierCardStyles.priceWrap}>
          {isPurchasing ? (
            <ActivityIndicator size="small" />
          ) : displayPrice ? (
            <Text style={supportTierCardStyles.price}>{displayPrice}</Text>
          ) : null}
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default SupportTierCard;
