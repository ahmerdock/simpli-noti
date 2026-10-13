import { createUpsertNotificationsSchema } from "./upsert-notifications.utils";

jest.mock("@/modules/exact-notifications", () => ({}));
jest.mock("react-native-toast-message", () => ({
  __esModule: true,
  default: { show: jest.fn() },
}));
jest.mock("@react-native-async-storage/async-storage", () =>
  jest.requireActual(
    "@react-native-async-storage/async-storage/jest/async-storage-mock",
  ),
);

const valid = {
  title: "Pay rent",
  date: "01 / 10 / 2026",
  time: "09:00 AM",
  repeat: "none" as const,
  description: "",
};

describe("createUpsertNotificationsSchema", () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 9, 13, 12, 0, 0));
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("rejects a past one-time reminder", () => {
    const result = createUpsertNotificationsSchema().safeParse(valid);
    expect(result.success).toBe(false);
  });

  it("accepts a future one-time reminder", () => {
    const result = createUpsertNotificationsSchema().safeParse({
      ...valid,
      date: "20 / 10 / 2026",
    });
    expect(result.success).toBe(true);
  });

  it("accepts a repeating reminder that started in the past", () => {
    const result = createUpsertNotificationsSchema().safeParse({
      ...valid,
      repeat: "daily",
    });
    expect(result.success).toBe(true);
  });

  it("accepts an unchanged past date and time when editing", () => {
    const schema = createUpsertNotificationsSchema({
      date: valid.date,
      time: valid.time,
    });
    expect(schema.safeParse({ ...valid, title: "Renamed" }).success).toBe(true);
  });

  it("still rejects a changed past date when editing", () => {
    const schema = createUpsertNotificationsSchema({
      date: valid.date,
      time: valid.time,
    });
    expect(schema.safeParse({ ...valid, date: "02 / 10 / 2026" }).success).toBe(
      false,
    );
  });

  it("requires a title", () => {
    const result = createUpsertNotificationsSchema().safeParse({
      ...valid,
      date: "20 / 10 / 2026",
      title: "   ",
    });
    expect(result.success).toBe(false);
  });
});
