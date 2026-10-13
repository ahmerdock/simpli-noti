import type { INotification } from "./notifications.interface";
import { parseStoredNotifications } from "./notifications.utils";

const valid: INotification = {
  id: "n1",
  title: "Pay rent",
  date: "01 / 10 / 2026",
  time: "09:00 AM",
  repeat: "monthly",
  description: "Landlord",
  isActive: true,
  createdAt: "2026-09-01T00:00:00.000Z",
};

describe("parseStoredNotifications", () => {
  it("keeps valid records", () => {
    expect(parseStoredNotifications({ notifications: [valid] })).toEqual([
      valid,
    ]);
  });

  it("accepts a record without a description", () => {
    const { description: _description, ...rest } = valid;

    expect(parseStoredNotifications({ notifications: [rest] })).toEqual([rest]);
  });

  it("drops records with a missing field or a wrong type", () => {
    const result = parseStoredNotifications({
      notifications: [
        valid,
        { ...valid, id: 5 },
        { ...valid, isActive: "yes" },
        { ...valid, title: undefined },
        null,
        "oops",
      ],
    });

    expect(result).toEqual([valid]);
  });

  it("drops records with an unknown repeat value", () => {
    expect(
      parseStoredNotifications({
        notifications: [{ ...valid, repeat: "hourly" }],
      }),
    ).toEqual([]);
  });

  it.each([undefined, null, "text", 3, [], {}, { notifications: "nope" }])(
    "returns undefined for unusable storage (%p)",
    (persisted) => {
      expect(parseStoredNotifications(persisted)).toBeUndefined();
    },
  );
});
