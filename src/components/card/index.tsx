import { View, Text } from "react-native";
import { cardStyles } from "./card.styles";
import { ICardProps } from "./card.interface";

const Card = (props: ICardProps) => {
  const { children } = props;

  return <View style={cardStyles.container}>{children}</View>;
};

export default Card;
