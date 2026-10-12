import { formatNotificationDateTime } from "./date-time-display";

const format = (
  date: string,
  repeat: Parameters<typeof formatNotificationDateTime>[0]["repeat"],
) => formatNotificationDateTime({ date, time: "09:30", repeat });

describe("formatNotificationDateTime", () => {
  it("shows the date and time for a one-off notification", () => {
    expect(format("05 / 03 / 2026", "none")).toBe("05 / 03 / 2026 • 09:30");
  });

  it("describes daily repeats by time only", () => {
    expect(format("05 / 03 / 2026", "daily")).toBe("Everyday at 09:30");
  });

  it("names the weekday for weekly repeats", () => {
    expect(format("05 / 03 / 2026", "weekly")).toBe("Every Thursday at 09:30");
  });

  it("uses an ordinal day for monthly repeats", () => {
    expect(format("01 / 03 / 2026", "monthly")).toBe(
      "Every Month on 1st at 09:30",
    );
    expect(format("12 / 03 / 2026", "monthly")).toBe(
      "Every Month on 12th at 09:30",
    );
    expect(format("23 / 03 / 2026", "monthly")).toBe(
      "Every Month on 23rd at 09:30",
    );
  });

  it("adds the month name for yearly repeats", () => {
    expect(format("22 / 03 / 2026", "yearly")).toBe(
      "Every Year on 22nd March at 09:30",
    );
  });

  it("falls back to the raw text when the date cannot be parsed", () => {
    expect(format("not a date", "weekly")).toBe("Every not a date at 09:30");
  });
});
