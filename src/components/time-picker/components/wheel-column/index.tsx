import { View, Text, ScrollView, Pressable } from "react-native";
import { ITEM_HEIGHT } from "./wheel-column.utils";
import { IWheelColumnProps } from "./wheel-column.interface";
import useWheelColumn from "./use-wheel-column";
import { wheelColumnStyles } from "./wheel-column.styles";

export default function WheelColumn(props: IWheelColumnProps) {
  const { label, data, selected } = props;

  const {
    scrollRef,
    handleScrollEndDrag,
    handleMomentumScrollEnd,
    selectIndex,
  } = useWheelColumn(props);

  return (
    <View style={wheelColumnStyles.container}>
      <View pointerEvents="none" style={wheelColumnStyles.highlightBar} />
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
        contentContainerStyle={wheelColumnStyles.scrollContent}
      >
        {data.map((item, index) => {
          const isSelected = item === selected;
          return (
            <Pressable
              key={item}
              style={wheelColumnStyles.item}
              onPress={() => selectIndex(index)}
              accessibilityRole="button"
              accessibilityLabel={`${label} ${item}`}
              accessibilityState={{ selected: isSelected }}
            >
              <Text style={wheelColumnStyles.itemText(isSelected)}>{item}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
