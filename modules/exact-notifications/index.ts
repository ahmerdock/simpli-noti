import ExactNotificationsModule from "./src/ExactNotificationsModule";
import type {
  NativeScheduleInput,
  PermissionStatus,
} from "./src/ExactNotifications.types";

export * from "./src/ExactNotifications.types";

/** True when the native module is linked (false on web). */
export const isAvailable = ExactNotificationsModule != null;

/**
 * Creates the Android notification channel (no-op on iOS). Safe to call
 * repeatedly.
 */
export function ensureChannel(): Promise<void> {
  return ExactNotificationsModule?.ensureChannel() ?? Promise.resolve();
}

/** Current POST_NOTIFICATIONS (Android) / UN authorization (iOS) status. */
export function getPermissionStatus(): Promise<PermissionStatus> {
  return ExactNotificationsModule?.getPermissionStatus() ?? Promise.resolve("denied");
}

/** Prompts for notification permission and resolves with the new status. */
export function requestPermission(): Promise<PermissionStatus> {
  return ExactNotificationsModule?.requestPermission() ?? Promise.resolve("denied");
}

/**
 * Arms an exact alarm (Android) / calendar trigger (iOS) for a single logical
 * notification. Re-scheduling an existing `id` replaces the previous one.
 */
export function schedule(input: NativeScheduleInput): Promise<void> {
  return ExactNotificationsModule?.schedule(input) ?? Promise.resolve();
}

/** Cancels a scheduled notification and clears any posted one for this `id`. */
export function cancel(id: string): Promise<void> {
  return ExactNotificationsModule?.cancel(id) ?? Promise.resolve();
}

/** Cancels every scheduled notification owned by this module. */
export function cancelAll(): Promise<void> {
  return ExactNotificationsModule?.cancelAll() ?? Promise.resolve();
}

/** Ids currently armed in the native layer (source of truth for reconcile). */
export function getScheduledIds(): Promise<string[]> {
  return ExactNotificationsModule?.getScheduledIds() ?? Promise.resolve([]);
}

/**
 * Opens the OS battery-optimization exemption prompt on Android so aggressive
 * OEM power managers don't delay/kill alarms. No-op on iOS/web.
 */
export function openBatteryOptimizationSettings(): Promise<void> {
  return ExactNotificationsModule?.openBatteryOptimizationSettings() ?? Promise.resolve();
}
