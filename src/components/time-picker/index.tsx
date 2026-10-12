import { View, Text } from "react-native";
import { HOURS, MINUTES, PERIODS } from "./time-picker.utils";
import { ITimePickerProps } from "./time-picker.interface";
import { WheelColumn } from "./components";
import { timePickerStyles } from "./time-picker.styles";

export default function TimePicker(props: ITimePickerProps) {
  const { hour, minute, period, onChange } = props;

  return (
    <View style={timePickerStyles.container}>
      <WheelColumn
        data={HOURS}
        selected={hour}
        onSelect={(h) => onChange(h, minute, period)}
      />
      <Text style={timePickerStyles.separator}>:</Text>
      <WheelColumn
        data={MINUTES}
        selected={minute}
        onSelect={(m) => onChange(hour, m, period)}
      />
      <WheelColumn
        data={PERIODS}
        selected={period}
        onSelect={(p) => onChange(hour, minute, p)}
      />
    </View>
  );
}
