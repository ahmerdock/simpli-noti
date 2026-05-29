import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import { IErrorAndNoDataStateProps } from "./error-and-no-data.interface";
import { BellOffIcon, ErrorIcon } from "@/assets/icons";
import { errorAndNoDataStyles } from "./error-and-no-data.styles";

const ErrorAndNoData = (props: IErrorAndNoDataStateProps) => {
  const {
    type = "noData",
    height,
    message,
    children,
    src,
    description,
    buttonVisibility = false,
    buttonText,
    buttonClick,
    noIcon = false,
  } = props;

  const defaultIcon = type === "error" ? ErrorIcon : BellOffIcon;

  const icon = src || defaultIcon;

  return (
    <View style={errorAndNoDataStyles.container(height)}>
      <View style={errorAndNoDataStyles.content}>
        {!noIcon && <Image source={icon} style={errorAndNoDataStyles.image} />}

        {message && (
          <Text style={errorAndNoDataStyles.messageText}>{message}</Text>
        )}

        {description && (
          <Text style={errorAndNoDataStyles.descriptionText}>
            {description}
          </Text>
        )}

        {buttonVisibility && buttonText && buttonClick && (
          <TouchableOpacity
            onPress={buttonClick}
            style={errorAndNoDataStyles.button}
          >
            {buttonText}
          </TouchableOpacity>
        )}
      </View>

      {children && (
        <View style={errorAndNoDataStyles.childrenContainer}>{children}</View>
      )}
    </View>
  );
};

export default ErrorAndNoData;
