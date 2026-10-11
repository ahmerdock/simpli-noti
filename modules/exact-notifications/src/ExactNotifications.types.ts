export type NativeRepeat = "none" | "daily" | "weekly" | "monthly" | "yearly";

/**
 * The minimal shape the native layer needs to arm an exact alarm / calendar
 * trigger. `triggerAtMillis` is an absolute epoch time (ms) already resolved to
 * the next future occurrence by the JS service.
 */
export interface NativeScheduleInput {
  id: string;
  title: string;
  body: string;
  triggerAtMillis: number;
  repeat: NativeRepeat;
  /** First occurrence; repeats are computed from it so month-ends do not drift. */
  anchorMillis: number;
}

export type PermissionStatus = "granted" | "denied" | "undetermined";
