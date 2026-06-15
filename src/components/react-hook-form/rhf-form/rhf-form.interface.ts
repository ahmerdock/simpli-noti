import { ReactNode } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

export interface IRHFFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  children: ReactNode;
}
