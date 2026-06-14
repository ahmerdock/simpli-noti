import { View, Text } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { HOURS, MINUTES, PERIODS } from "./time-picker.data";
import { ITimePickerProps } from "./time-picker.interface";
import { WheelColumn } from "./components";

const TimePicker = ({ hour, minute, period, onChange }: ITimePickerProps) => {
  const { theme } = useUnistyles();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colors.backgroundSecondary,
        borderRadius: 16,
        paddingHorizontal: 8,
        overflow: "hidden",
      }}
    >
      <WheelColumn
        data={HOURS}
        selected={hour}
        onSelect={(h) => onChange(h, minute, period)}
      />
      <Text
        style={{
          fontSize: 20,
          color: theme.colors.textSecondary,
          paddingBottom: 2,
        }}
      >
        :
      </Text>
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
};

export default TimePicker;
