import { useState } from "react";

export const useRHFSelect = () => {
  const [visible, setVisible] = useState(false);

  const open = () => setVisible(true);
  const close = () => setVisible(false);

  const selectOption = <V extends string>(
    onChange: (value: V) => void,
    value: V,
  ) => {
    onChange(value);
    close();
  };

  return {
    visible,
    open,
    close,
    selectOption,
  };
};
