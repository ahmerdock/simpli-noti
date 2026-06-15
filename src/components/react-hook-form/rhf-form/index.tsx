import { FormProvider, FieldValues } from "react-hook-form";
import { IRHFFormProps } from "./rhf-form.interface";

const RHFForm = <T extends FieldValues>({
  form,
  children,
}: IRHFFormProps<T>) => <FormProvider {...form}>{children}</FormProvider>;

export default RHFForm;
