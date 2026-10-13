import { requireOptionalNativeModule } from "expo";

import type {
  INativeScheduleInput,
  IPermissionStatus,
} from "./ExactNotifications.types";

interface IExactNotificationsNativeModule {
  ensureChannel(): Promise<void>;
  getPermissionStatus(): Promise<IPermissionStatus>;
  requestPermission(): Promise<IPermissionStatus>;
  schedule(input: INativeScheduleInput): Promise<void>;
  cancel(id: string, clearDelivered?: boolean): Promise<void>;
  getScheduledIds(): Promise<string[]>;
  openBatteryOptimizationSettings(): Promise<void>;
}

// Registered natively under `Name("ExactNotifications")`. Returns `null` where
// the native module is unavailable (e.g. web) so callers can no-op safely.
export default requireOptionalNativeModule<IExactNotificationsNativeModule>(
  "ExactNotifications",
);
