import { REPEAT_TYPES } from "./notifications.data";
import type { INotification } from "./notifications.interface";

const isNotification = (value: unknown): value is INotification => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const { id, title, date, time, repeat, description, isActive, createdAt } =
    value as Record<string, unknown>;

  return (
    typeof id === "string" &&
    typeof title === "string" &&
    typeof date === "string" &&
    typeof time === "string" &&
    typeof repeat === "string" &&
    REPEAT_TYPES.some((type) => type === repeat) &&
    (description === undefined || typeof description === "string") &&
    typeof isActive === "boolean" &&
    typeof createdAt === "string"
  );
};

// Storage can hold data from an older version or a damaged write. Keep the
// records that are valid and drop the rest, so one bad record cannot crash the
// app on every start. Returns undefined when storage has no usable list.
export const parseStoredNotifications = (
  persisted: unknown,
): INotification[] | undefined => {
  if (
    typeof persisted !== "object" ||
    persisted === null ||
    !("notifications" in persisted) ||
    !Array.isArray(persisted.notifications)
  ) {
    return undefined;
  }

  return persisted.notifications.filter(isNotification);
};
