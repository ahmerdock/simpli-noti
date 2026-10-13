import { Text } from "react-native";
import { rhfFieldStyles } from "../react-hook-form.styles";
import { IRHFFieldErrorProps } from "./rhf-field-error.interface";

export default function RHFFieldError(props: IRHFFieldErrorProps) {
  const { message } = props;

  return (
    <Text
      style={rhfFieldStyles.fieldError}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      {message}
    </Text>
  );
}
