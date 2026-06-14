import { View, Text, ScrollView } from "react-native";
import { ITEM_HEIGHT, PICKER_HEIGHT } from "./wheel-column.data";
import { IWheelColumnProps } from "./wheel-column.interface";
import useWheelColumn from "./use-wheel-column";

const WheelColumn = (props: IWheelColumnProps) => {
  const { data, selected } = props;

  const { theme, scrollRef, handleScrollEndDrag, handleMomentumScrollEnd } =
    useWheelColumn(props);

  return (
    <View style={{ height: PICKER_HEIGHT, flex: 1, minWidth: 56 }}>
      {/* highlight bar */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: ITEM_HEIGHT * 2,
          left: 4,
          right: 4,
          height: ITEM_HEIGHT,
          borderRadius: 10,
          backgroundColor: theme.colors.primary,
          opacity: 0.15,
          zIndex: 1,
        }}
      />
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        snapToAlignment="start"
        disableIntervalMomentum
        decelerationRate="fast"
        nestedScrollEnabled
        onScrollEndDrag={handleScrollEndDrag}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        contentContainerStyle={{
          paddingVertical: ITEM_HEIGHT * 2,
        }}
      >
        {data.map((item) => {
          const isSelected = item === selected;
          return (
            <View
              key={item}
              style={{
                height: ITEM_HEIGHT,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: isSelected ? 20 : 16,
                  fontFamily: isSelected
                    ? theme.typography.primary.medium
                    : theme.typography.primary.regular,
                  color: isSelected
                    ? theme.colors.primary
                    : theme.colors.textSecondary,
                }}
              >
                {item}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default WheelColumn;
