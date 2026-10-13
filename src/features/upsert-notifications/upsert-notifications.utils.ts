import { DATE_FORMAT, TIME_FORMAT } from "@/constants/date-time";
import type { INotification } from "@/store";
import dayjs from "dayjs";
import { z } from "zod";
import { isInThePast } from "@/services";
import { DESCRIPTION_MAX } from "./upsert-notifications.data";
import type { IFormValues } from "./upsert-notifications.interface";

/**
 * `original` is the reminder being edited. Leaving its date and time untouched
 * is always allowed, so an expired one-time reminder can still be renamed.
 */
export const createUpsertNotificationsSchema = (
  original?: Pick<INotification, "date" | "time">,
) =>
  z
    .object({
      title: z.string().trim().min(1, "Title is required"),
      date: z.string().min(1, "Date is required"),
      time: z.string().min(1, "Time is required"),
      repeat: z.enum(["none", "daily", "weekly", "monthly", "yearly"]),
      description: z.string().trim().max(DESCRIPTION_MAX).optional(),
    })
    .refine(
      (v) =>
        v.repeat !== "none" ||
        !isInThePast({ date: v.date, time: v.time }) ||
        (original?.date === v.date && original?.time === v.time),
      { message: "Pick a date and time in the future", path: ["time"] },
    );

export const getDefaultFormValues = (): IFormValues => ({
  title: "",
  date: dayjs().format(DATE_FORMAT),
  // A few minutes ahead, so saving with the defaults is a valid reminder.
  time: dayjs().add(5, "minute").format(TIME_FORMAT),
  repeat: "none",
  description: "",
});

export const notificationToFormValues = (
  notification: INotification,
): IFormValues => ({
  title: notification.title,
  date: notification.date,
  time: notification.time,
  repeat: notification.repeat,
  description: notification.description ?? "",
});
