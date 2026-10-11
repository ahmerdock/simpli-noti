import { requireOptionalNativeModule } from "expo";

import type {
  NativeScheduleInput,
  PermissionStatus,
} from "./ExactNotifications.types";

export interface ExactNotificationsNativeModule {
  ensureChannel(): Promise<void>;
  getPermissionStatus(): Promise<PermissionStatus>;
  requestPermission(): Promise<PermissionStatus>;
  schedule(input: NativeScheduleInput): Promise<void>;
  cancel(id: string): Promise<void>;
  cancelAll(): Promise<void>;
  getScheduledIds(): Promise<string[]>;
  openBatteryOptimizationSettings(): Promise<void>;
}

// Registered natively under `Name("ExactNotifications")`. Returns `null` where
// the native module is unavailable (e.g. web) so callers can no-op safely.
export default requireOptionalNativeModule<ExactNotificationsNativeModule>(
  "ExactNotifications",
);
