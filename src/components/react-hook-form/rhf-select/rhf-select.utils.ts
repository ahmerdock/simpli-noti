import { ISelectOption } from "./rhf-select.interface";

export const getSelectedLabel = <V extends string>(
  value: unknown,
  options: readonly ISelectOption<V>[],
) => options.find((option) => option.value === value)?.label ?? "";
