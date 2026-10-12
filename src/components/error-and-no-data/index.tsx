import { View, Text } from "react-native";
import BellOff from "lucide-react-native/icons/bell-off";
import { useUnistyles } from "react-native-unistyles";
import AppIcon from "../app-icon";
import { IErrorAndNoDataStateProps } from "./error-and-no-data.interface";
import { errorAndNoDataStyles } from "./error-and-no-data.styles";

export default function ErrorAndNoData(props: IErrorAndNoDataStateProps) {
  const { message, description } = props;

  const { theme } = useUnistyles();

  return (
    <View style={errorAndNoDataStyles.container}>
      <View style={errorAndNoDataStyles.iconWrap}>
        <AppIcon icon={BellOff} size={30} color={theme.colors.primary} />
      </View>

      {message && (
        <Text style={errorAndNoDataStyles.messageText}>{message}</Text>
      )}

      {description && (
        <Text style={errorAndNoDataStyles.descriptionText}>{description}</Text>
      )}
    </View>
  );
}
