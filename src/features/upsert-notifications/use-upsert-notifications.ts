import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getDefaultFormValues,
  FormValues,
  notificationToFormValues,
  upsertNotificationsSchema,
} from "./upsert-notifications.utils";
import { useNotificationStore } from "@/store";

export default function useUpsertNotifications() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const notificationId = typeof id === "string" ? id : undefined;
  const isEditing = Boolean(notificationId);

  const notifications = useNotificationStore((s) => s.notifications);
  const addNotification = useNotificationStore((s) => s.addNotification);
  const editNotification = useNotificationStore((s) => s.editNotification);
  const deleteNotification = useNotificationStore((s) => s.deleteNotification);
  const toggleNotification = useNotificationStore((s) => s.toggleNotification);

  const form = useForm<FormValues>({
    resolver: zodResolver(upsertNotificationsSchema),
    defaultValues: getDefaultFormValues(),
  });

  const { handleSubmit } = form;

  const existingNotification = notifications.find(
    (n) => n.id === notificationId,
  );

  useEffect(() => {
    if (!notificationId) {
      form.reset(getDefaultFormValues());
      return;
    }

    if (!existingNotification) {
      router.back();
      return;
    }

    form.reset(notificationToFormValues(existingNotification));
  }, [notificationId]);

  const handleCancel = () => router.back();

  const handleDelete = () => {
    if (notificationId) {
      deleteNotification(notificationId);
      router.back();
    }
  };

  const handleToggle = () => {
    if (notificationId) {
      toggleNotification(notificationId);
      router.back();
    }
  };

  const onSubmit = (data: FormValues) => {
    if (isEditing && notificationId) {
      editNotification(notificationId, {
        title: data.title,
        date: data.date,
        time: data.time,
        repeat: data.repeat,
        description: data.description,
      });
    } else {
      addNotification({
        title: data.title,
        date: data.date,
        time: data.time,
        repeat: data.repeat,
        description: data.description,
      });
    }
    router.back();
  };

  return {
    form,
    handleSubmit,
    handleCancel,
    handleDelete,
    handleToggle,
    onSubmit,
    isEditing,
    isActive: existingNotification?.isActive ?? true,
  };
}
