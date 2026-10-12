import Toast from "react-native-toast-message";
import type { INotification } from "@/store";
import * as ExactNotifications from "@/modules/exact-notifications";
import { computeTriggerAt, parseNotificationDateTime } from "./schedule-time";

function bodyOf(n: INotification): string {
  return n.description?.trim() ?? "";
}

/**
 * Ensures the channel exists and notification permission is granted, prompting
 * once if needed. Returns whether notifications can actually be posted. Never
 * throws: a native failure is reported as "not ready".
 */
async function ensureReady(): Promise<boolean> {
  try {
    await ExactNotifications.ensureChannel();
    let status = await ExactNotifications.getPermissionStatus();
    if (status === "undetermined" || status === "denied") {
      status = await ExactNotifications.requestPermission();
    }
    return status === "granted";
  } catch {
    return false;
  }
}

/**
 * Brings the native scheduled alarm for a single notification in sync with its
 * current record: arms it when active and due in the future (or repeating),
 * otherwise cancels it. Re-arming replaces any previous alarm for the same id.
 *
 * Returns "expired" when an active one-time reminder's time has passed. That
 * case only drops the pending alarm and leaves any already-delivered
 * notification in the tray.
 */
async function syncNotification(
  n: INotification,
): Promise<"armed" | "cancelled" | "expired"> {
  if (!n.isActive) {
    await cancelNotification(n.id);
    return "cancelled";
  }

  const base = parseNotificationDateTime(n);
  const triggerAtMillis = computeTriggerAt(n);
  if (base == null || triggerAtMillis == null) {
    await ExactNotifications.cancel(n.id, false);
    return "expired";
  }

  await ExactNotifications.schedule({
    id: n.id,
    title: n.title,
    body: bodyOf(n),
    triggerAtMillis,
    repeat: n.repeat,
    anchorMillis: base.valueOf(),
  });
  return "armed";
}

/**
 * Used when the user adds/edits/enables a reminder: makes sure permission is
 * granted first (re-prompting if possible) and tells the user if the reminder
 * cannot be delivered, instead of failing silently.
 *
 * `getCurrent` is read again after the permission prompt so an edit or delete
 * made in the meantime is never overwritten by this older copy.
 */
async function syncWithPermission(
  getCurrent: () => INotification | undefined,
  onExpired?: () => void,
): Promise<void> {
  const initial = getCurrent();
  if (!initial) return;

  if (initial.isActive && !(await ensureReady())) {
    Toast.show({
      type: "error",
      text1: "Notifications are blocked",
      text2:
        "Allow notifications for Simpli Noti in system settings to get reminders.",
    });
  }

  const current = getCurrent();
  if (!current) return;

  try {
    const result = await syncNotification(current);
    if (result === "expired") {
      onExpired?.();
      Toast.show({
        type: "info",
        text1: "That time has already passed",
        text2: "Edit the reminder and pick a future date and time.",
      });
    }
  } catch {
    Toast.show({
      type: "error",
      text1: "Couldn't schedule the reminder",
      text2: "Please try again.",
    });
  }
}

async function cancelNotification(id: string): Promise<void> {
  await ExactNotifications.cancel(id);
}

/**
 * Repairs drift between the store and the native layer (covers reboots,
 * permission-off periods, app upgrades and clock changes). Cancels any armed
 * alarm that no longer has a matching active record, then (re)arms every
 * active record. One-time reminders whose time has passed (they already fired)
 * are reported through `onExpired` so the caller can mark them done.
 */
async function reconcile(
  notifications: INotification[],
  onExpired?: (id: string) => void,
): Promise<void> {
  await ExactNotifications.ensureChannel();

  const scheduledIds = await ExactNotifications.getScheduledIds();
  const active = notifications.filter((n) => n.isActive);
  const activeIds = new Set(active.map((n) => n.id));

  await Promise.all(
    scheduledIds
      .filter((id) => !activeIds.has(id))
      .map((id) => cancelNotification(id)),
  );

  await Promise.all(
    active.map(async (n) => {
      try {
        const result = await syncNotification(n);
        if (result === "expired" && n.repeat === "none") onExpired?.(n.id);
      } catch {
        // One bad record must not stop the rest from being re-armed.
      }
    }),
  );
}

export const NotificationService = {
  ensureReady,
  syncNotification,
  syncWithPermission,
  cancelNotification,
  reconcile,
  openBatteryOptimizationSettings: async () => {
    try {
      await ExactNotifications.openBatteryOptimizationSettings();
    } catch {
      // No settings screen available on this device; nothing else to do.
    }
  },
  isAvailable: ExactNotifications.isAvailable,
};
