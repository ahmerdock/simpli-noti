import { SelectOption } from "./rhf-select.interface";

export const getSelectedLabel = <V extends string>(
  value: unknown,
  options: readonly SelectOption<V>[],
  placeholder: string,
) => options.find((option) => option.value === value)?.label ?? placeholder;
