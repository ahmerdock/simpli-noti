import { useRef, useEffect, useCallback } from "react";
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { ITEM_HEIGHT, VELOCITY_THRESHOLD } from "./wheel-column.data";
import { IWheelColumnProps } from "./wheel-column.interface";

const useWheelColumn = (props: IWheelColumnProps) => {
  const { data, selected, onSelect } = props;

  const { theme } = useUnistyles();
  const scrollRef = useRef<ScrollView>(null);
  const lastSnappedIndexRef = useRef(data.indexOf(selected));
  const selectedIndex = data.indexOf(selected);

  useEffect(() => {
    if (selectedIndex >= 0) {
      lastSnappedIndexRef.current = selectedIndex;
      scrollRef.current?.scrollTo({
        y: selectedIndex * ITEM_HEIGHT,
        animated: false,
      });
    }
  }, []);

  const snapToNearest = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = e.nativeEvent.contentOffset.y;
      const index = Math.round(y / ITEM_HEIGHT);
      const clamped = Math.max(0, Math.min(index, data.length - 1));
      const targetY = clamped * ITEM_HEIGHT;

      if (Math.abs(y - targetY) > 0.5) {
        scrollRef.current?.scrollTo({ y: targetY, animated: false });
      }

      if (lastSnappedIndexRef.current !== clamped) {
        lastSnappedIndexRef.current = clamped;
        onSelect(data[clamped]);
      }
    },
    [data, onSelect],
  );

  const handleScrollEndDrag = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const velocityY = e.nativeEvent.velocity?.y ?? 0;
      if (Math.abs(velocityY) <= VELOCITY_THRESHOLD) {
        snapToNearest(e);
      }
    },
    [snapToNearest],
  );

  const handleMomentumScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      snapToNearest(e);
    },
    [snapToNearest],
  );

  return { theme, scrollRef, handleScrollEndDrag, handleMomentumScrollEnd };
};

export default useWheelColumn;
