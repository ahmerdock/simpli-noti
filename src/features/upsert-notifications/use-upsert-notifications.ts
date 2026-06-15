import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  defaultFormValues,
  FormValues,
  upsertNotificationsSchema,
} from "./upsert-notifications.utils";

const useUpsertNotifications = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(upsertNotificationsSchema),
    defaultValues: defaultFormValues,
  });

  const { handleSubmit } = form;

  const handleCancel = () => router.back();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // wire up expo-notifications here
  };

  return {
    form,
    handleSubmit,
    handleCancel,
    onSubmit,
  };
};

export default useUpsertNotifications;
