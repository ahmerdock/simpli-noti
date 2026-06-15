import { Text, TouchableOpacity } from "react-native";
import { IButtonProps } from "./button.interface";
import { buttonStyles } from "./button.styles";

const Button = ({
  variant = "submit",
  label,
  style,
  disabled,
  ...rest
}: IButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled}
      style={[
        buttonStyles.container(variant),
        disabled && { opacity: 0.5 },
        style,
      ]}
      {...rest}
    >
      <Text style={buttonStyles.label(variant)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;
