import { DATE_FORMAT, TIME_FORMAT } from "@/constants/date-time";
import type { INotification } from "@/store";
import dayjs from "dayjs";
import { z } from "zod";
import { isInThePast } from "@/services/notifications/schedule-time";
import { DESCRIPTION_MAX } from "./upsert-notifications.data";
import type { FormValues } from "./upsert-notifications.interface";

export const upsertNotificationsSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required"),
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    repeat: z.enum(["none", "daily", "weekly", "monthly", "yearly"]),
    description: z.string().trim().max(DESCRIPTION_MAX).optional(),
  })
  .refine(
    (v) => v.repeat !== "none" || !isInThePast({ date: v.date, time: v.time }),
    { message: "Pick a date and time in the future", path: ["time"] },
  );

export const getDefaultFormValues = (): FormValues => ({
  title: "",
  date: dayjs().format(DATE_FORMAT),
  // A few minutes ahead, so saving with the defaults is a valid reminder.
  time: dayjs().add(5, "minute").format(TIME_FORMAT),
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
