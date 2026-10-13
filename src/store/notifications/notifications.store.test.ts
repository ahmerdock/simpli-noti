import type { INotification } from "./notifications.interface";
import { useNotificationStore } from "./notifications.store";

jest.mock("@react-native-async-storage/async-storage", () =>
  jest.requireActual(
    "@react-native-async-storage/async-storage/jest/async-storage-mock",
  ),
);
jest.mock("react-native-toast-message", () => ({
  __esModule: true,
  default: { show: jest.fn() },
}));
jest.mock("@/modules/exact-notifications", () => ({
  ensureChannel: jest.fn().mockResolvedValue(undefined),
  getPermissionStatus: jest.fn().mockResolvedValue("granted"),
  requestPermission: jest.fn().mockResolvedValue("granted"),
  schedule: jest.fn().mockResolvedValue(undefined),
  cancel: jest.fn().mockResolvedValue(undefined),
  getScheduledIds: jest.fn().mockResolvedValue([]),
  openBatteryOptimizationSettings: jest.fn().mockResolvedValue(undefined),
}));

const base: INotification = {
  id: "n1",
  title: "Pay rent",
  date: "01 / 10 / 2026",
  time: "09:00 AM",
  repeat: "none",
  isActive: false,
  createdAt: "2026-09-01T00:00:00.000Z",
};

const seed = (item: INotification) =>
  useNotificationStore.setState({ notifications: [item] });
const current = () => useNotificationStore.getState().notifications[0];
const input = (over: Partial<INotification> = {}) => ({
  title: base.title,
  date: base.date,
  time: base.time,
  repeat: base.repeat,
  ...over,
});

describe("editNotification", () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 9, 13, 12, 0, 0));
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("turns an expired one-time reminder back on when moved to the future", () => {
    seed(base);
    useNotificationStore
      .getState()
      .editNotification("n1", input({ date: "20 / 10 / 2026" }));
    expect(current().isActive).toBe(true);
    expect(current().date).toBe("20 / 10 / 2026");
  });

  it("keeps an expired reminder off when only the title changes", () => {
    seed(base);
    useNotificationStore
      .getState()
      .editNotification("n1", input({ title: "Pay rent now" }));
    expect(current().isActive).toBe(false);
    expect(current().title).toBe("Pay rent now");
  });

  it("does not re-enable a reminder the user disabled themselves", () => {
    seed({ ...base, date: "20 / 10 / 2026" });
    useNotificationStore
      .getState()
      .editNotification("n1", input({ date: "21 / 10 / 2026" }));
    expect(current().isActive).toBe(false);
  });

  it("leaves an active reminder active", () => {
    seed({ ...base, date: "20 / 10 / 2026", isActive: true });
    useNotificationStore
      .getState()
      .editNotification("n1", input({ date: "22 / 10 / 2026" }));
    expect(current().isActive).toBe(true);
  });
});

describe("expireNotification", () => {
  it("only deactivates active one-time reminders", () => {
    seed({ ...base, isActive: true, repeat: "daily" });
    useNotificationStore.getState().expireNotification("n1");
    expect(current().isActive).toBe(true);

    seed({ ...base, isActive: true });
    useNotificationStore.getState().expireNotification("n1");
    expect(current().isActive).toBe(false);
  });
});
