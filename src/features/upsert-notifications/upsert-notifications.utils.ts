import { DEFAULT_DATE_FORMAT } from "@/components/react-hook-form/rhf-date-picker/rhf-date-picker.utils";
import { INotification } from "@/store";
import dayjs from "dayjs";
import { z } from "zod";
import {
  isInThePast,
} from "@/services/notifications/schedule-time";

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
}).refine(
  (v) => v.repeat !== "none" || !isInThePast({ date: v.date, time: v.time }),
  { message: "Pick a date and time in the future", path: ["time"] },
);

export type FormValues = z.infer<typeof upsertNotificationsSchema>;

export const getDefaultFormValues = (): FormValues => ({
  title: "",
  date: dayjs().format(DEFAULT_DATE_FORMAT),
  // A few minutes ahead, so saving with the defaults is a valid reminder.
  time: dayjs().add(5, "minute").format("hh:mm A"),
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
