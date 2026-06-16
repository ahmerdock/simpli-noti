import { DEFAULT_DATE_FORMAT } from "@/components/react-hook-form/rhf-date-picker/rhf-date-picker.utils";
import { INotification } from "@/store";
import dayjs from "dayjs";
import { z } from "zod";

export const DESCRIPTION_MAX = 160;

export const REPEAT_OPTIONS = [
  { label: "No Repeat", value: "none" },
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
] as const;

export type RepeatValue = (typeof REPEAT_OPTIONS)[number]["value"];

export const upsertNotificationsSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  repeat: z.enum(["none", "daily", "weekly", "monthly", "yearly"]),
  description: z.string().trim().max(DESCRIPTION_MAX).optional(),
});

export type FormValues = z.infer<typeof upsertNotificationsSchema>;

export const getDefaultFormValues = (): FormValues => ({
  title: "",
  date: dayjs().format(DEFAULT_DATE_FORMAT),
  time: dayjs().format("hh:mm A"),
  repeat: "none",
  description: "",
});

export const notificationToFormValues = (
  notification: INotification,
): FormValues => ({
  title: notification.title,
  date: notification.date,
  time: notification.time,
  repeat: notification.repeat,
  description: notification.description ?? "",
});
