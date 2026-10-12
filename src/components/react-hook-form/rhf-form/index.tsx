import { FormProvider, FieldValues } from "react-hook-form";
import { IRHFFormProps } from "./rhf-form.interface";

export default function RHFForm<T extends FieldValues>(
  props: IRHFFormProps<T>,
) {
  const { form, children } = props;

  return <FormProvider {...form}>{children}</FormProvider>;
}
