import { Text } from "react-native";
import { IShortHeadingProps } from "./short-heading.interface";
import { shortHeadingStyles } from "./short-heading.styles";

const ShortHeading = (props: IShortHeadingProps) => {
  const { heading, style } = props;

  return <Text style={[shortHeadingStyles.heading, style]}>{heading}</Text>;
};

export default ShortHeading;
