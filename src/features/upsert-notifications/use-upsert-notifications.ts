import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FormValues } from "./upsert-notifications.interface";
import {
  getDefaultFormValues,
  notificationToFormValues,
  upsertNotificationsSchema,
} from "./upsert-notifications.utils";
import { useNotificationStore } from "@/store";

export default function useUpsertNotifications() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const notificationId = typeof id === "string" ? id : undefined;
  const isEditing = notificationId !== undefined;

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

  // Fill the form once per screen target. Later store changes (such as this
  // very reminder being deleted) must not reset it or navigate back again.
  const initializedForRef = useRef<string | null | undefined>(null);

  useEffect(() => {
    if (initializedForRef.current === notificationId) return;
    initializedForRef.current = notificationId;

    if (!notificationId) {
      form.reset(getDefaultFormValues());
      return;
    }

    if (!existingNotification) {
      router.back();
      return;
    }

    form.reset(notificationToFormValues(existingNotification));
  }, [notificationId, existingNotification, form]);

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
    if (notificationId) {
      editNotification(notificationId, data);
    } else {
      addNotification(data);
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
