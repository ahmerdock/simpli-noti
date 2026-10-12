import { useRef, useEffect, useCallback } from "react";
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { ITEM_HEIGHT, VELOCITY_THRESHOLD } from "./wheel-column.utils";
import { IWheelColumnProps } from "./wheel-column.interface";

export default function useWheelColumn(props: IWheelColumnProps) {
  const { data, selected, onSelect } = props;

  const scrollRef = useRef<ScrollView>(null);
  const lastSnappedIndexRef = useRef(data.indexOf(selected));
  const initialIndexRef = useRef(data.indexOf(selected));

  useEffect(() => {
    const initialIndex = initialIndexRef.current;
    if (initialIndex >= 0) {
      lastSnappedIndexRef.current = initialIndex;
      scrollRef.current?.scrollTo({
        y: initialIndex * ITEM_HEIGHT,
        animated: false,
      });
    }
  }, []);

  const commitIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, data.length - 1));

      if (lastSnappedIndexRef.current !== clamped) {
        lastSnappedIndexRef.current = clamped;
        onSelect(data[clamped]);
      }

      return clamped;
    },
    [data, onSelect],
  );

  const selectIndex = useCallback(
    (index: number) => {
      const clamped = commitIndex(index);
      scrollRef.current?.scrollTo({ y: clamped * ITEM_HEIGHT, animated: true });
    },
    [commitIndex],
  );

  const snapToNearest = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = e.nativeEvent.contentOffset.y;
      const clamped = commitIndex(Math.round(y / ITEM_HEIGHT));
      const targetY = clamped * ITEM_HEIGHT;

      if (Math.abs(y - targetY) > 0.5) {
        scrollRef.current?.scrollTo({ y: targetY, animated: false });
      }
    },
    [commitIndex],
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

  return {
    scrollRef,
    handleScrollEndDrag,
    handleMomentumScrollEnd: snapToNearest,
    selectIndex,
  };
}
