import { View, Text, ScrollView } from "react-native";
import { ITEM_HEIGHT } from "./wheel-column.data";
import { IWheelColumnProps } from "./wheel-column.interface";
import useWheelColumn from "./use-wheel-column";
import { wheelColumnStyles } from "./wheel-column.styles";

const WheelColumn = (props: IWheelColumnProps) => {
  const { data, selected } = props;

  const { scrollRef, handleScrollEndDrag, handleMomentumScrollEnd } =
    useWheelColumn(props);

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
        {data.map((item) => {
          const isSelected = item === selected;
          return (
            <View key={item} style={wheelColumnStyles.item}>
              <Text style={wheelColumnStyles.itemText(isSelected)}>{item}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default WheelColumn;
