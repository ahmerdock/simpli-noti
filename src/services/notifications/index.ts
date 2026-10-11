import Toast from "react-native-toast-message";
import type { INotification } from "@/store";
import * as ExactNotifications from "../../../modules/exact-notifications";
import { computeTriggerAt } from "./schedule-time";

function bodyOf(n: INotification): string {
  return n.description?.trim() ?? "";
}

/**
 * Ensures the channel exists and notification permission is granted, prompting
 * once if needed. Returns whether notifications can actually be posted.
 */
async function ensureReady(): Promise<boolean> {
  await ExactNotifications.ensureChannel();
  let status = await ExactNotifications.getPermissionStatus();
  if (status === "undetermined" || status === "denied") {
    status = await ExactNotifications.requestPermission();
  }
  return status === "granted";
}

/**
 * Brings the native scheduled alarm for a single notification in sync with its
 * current record: arms it when active and due in the future (or repeating),
 * otherwise cancels it. Re-arming replaces any previous alarm for the same id.
 */
async function syncNotification(n: INotification): Promise<void> {
  if (!n.isActive) {
    await cancelNotification(n.id);
    return;
  }

  const triggerAtMillis = computeTriggerAt(n);
  if (triggerAtMillis == null) {
    // Past one-shot or malformed date/time — make sure nothing is armed.
    await cancelNotification(n.id);
    return;
  }

  await ExactNotifications.schedule({
    id: n.id,
    title: n.title,
    body: bodyOf(n),
    triggerAtMillis,
    repeat: n.repeat,
  });
}

/**
 * Used when the user adds/edits/enables a reminder: makes sure permission is
 * granted first (re-prompting if possible) and tells the user if the reminder
 * cannot be delivered, instead of failing silently.
 */
async function syncWithPermission(n: INotification): Promise<void> {
  if (n.isActive && !(await ensureReady())) {
    Toast.show({
      type: "error",
      text1: "Notifications are blocked",
      text2: "Allow notifications for Simpli Noti in system settings to get reminders.",
    });
  }
  await syncNotification(n);
}

async function cancelNotification(id: string): Promise<void> {
  await ExactNotifications.cancel(id);
}

/**
 * Repairs drift between the store and the native layer (covers reboots,
 * permission-off periods and app upgrades). Cancels any armed alarm that no
 * longer has a matching active record, then (re)arms every active record.
 */
async function reconcile(notifications: INotification[]): Promise<void> {
  await ExactNotifications.ensureChannel();

  const scheduledIds = await ExactNotifications.getScheduledIds();
  const active = notifications.filter((n) => n.isActive);
  const activeIds = new Set(active.map((n) => n.id));

  await Promise.all(
    scheduledIds
      .filter((id) => !activeIds.has(id))
      .map((id) => cancelNotification(id)),
  );

  await Promise.all(active.map((n) => syncNotification(n)));
}

export const NotificationService = {
  ensureReady,
  syncNotification,
  syncWithPermission,
  cancelNotification,
  reconcile,
  openBatteryOptimizationSettings:
    ExactNotifications.openBatteryOptimizationSettings,
  isAvailable: ExactNotifications.isAvailable,
};
