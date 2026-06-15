import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  defaultFormValues,
  FormValues,
  upsertNotificationsSchema,
} from "./upsert-notifications.utils";
import { useNotificationStore } from "@/store";

const useUpsertNotifications = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(upsertNotificationsSchema),
    defaultValues: defaultFormValues,
  });

  const { handleSubmit } = form;

  const handleCancel = () => router.back();

  const addNotification = useNotificationStore((s) => s.addNotification);

  const onSubmit = (data: FormValues) => {
    addNotification({
      title: data.title,
      date: data.date,
      time: data.time,
      repeat: data.repeat,
      description: data.description,
    });
    router.back();
  };

  return {
    form,
    handleSubmit,
    handleCancel,
    onSubmit,
  };
};

export default useUpsertNotifications;
