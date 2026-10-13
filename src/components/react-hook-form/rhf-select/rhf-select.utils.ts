import { ISelectOption } from "./rhf-select.interface";

export const getSelectedLabel = <V extends string>(
  value: unknown,
  options: readonly ISelectOption<V>[],
  placeholder: string,
) => options.find((option) => option.value === value)?.label ?? placeholder;
