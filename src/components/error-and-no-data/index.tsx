import { View, Text, Image } from "react-native";
import { IErrorAndNoDataStateProps } from "./error-and-no-data.interface";
import { BellOffIcon } from "@/assets/icons";
import { errorAndNoDataStyles } from "./error-and-no-data.styles";

const ErrorAndNoData = (props: IErrorAndNoDataStateProps) => {
  const { message, description } = props;

  return (
    <View style={errorAndNoDataStyles.container}>
      <Image source={BellOffIcon} style={errorAndNoDataStyles.image} />

      {message && (
        <Text style={errorAndNoDataStyles.messageText}>{message}</Text>
      )}

      {description && (
        <Text style={errorAndNoDataStyles.descriptionText}>{description}</Text>
      )}
    </View>
  );
};

export default ErrorAndNoData;
