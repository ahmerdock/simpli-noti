import { Text, View } from "react-native";
import { rhfFieldStyles } from "../react-hook-form.styles";
import { IRHFFieldLabelProps } from "./rhf-field-label.interface";

export default function RHFFieldLabel(props: IRHFFieldLabelProps) {
  const { label, required } = props;

  return (
    <View style={rhfFieldStyles.labelRow}>
      <Text style={rhfFieldStyles.fieldLabel}>{label}</Text>
      {required && (
        <Text
          style={rhfFieldStyles.requiredMark}
          importantForAccessibility="no"
          accessibilityElementsHidden
        >
          *
        </Text>
      )}
    </View>
  );
}
