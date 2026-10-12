import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { computeTriggerAt } from "./schedule-time";

dayjs.extend(customParseFormat);

const at = (
  date: string,
  time: string,
  repeat: "daily" | "weekly" | "monthly" | "yearly" | "none",
) => ({ date, time, repeat }) as const;

describe("computeTriggerAt", () => {
  const now = dayjs("2026-10-13 12:00", "YYYY-MM-DD HH:mm");

  it("returns the start time for a future one-off", () => {
    const t = computeTriggerAt(at("20 / 10 / 2026", "09:00 AM", "none"), now);
    expect(dayjs(t!).format("YYYY-MM-DD HH:mm")).toBe("2026-10-20 09:00");
  });

  it("returns null for a one-off in the past", () => {
    expect(
      computeTriggerAt(at("01 / 10 / 2026", "09:00 AM", "none"), now),
    ).toBeNull();
  });

  it("rolls a daily reminder started years ago to the next occurrence", () => {
    const t = computeTriggerAt(at("01 / 01 / 2020", "09:00 AM", "daily"), now);
    expect(dayjs(t!).format("YYYY-MM-DD HH:mm")).toBe("2026-10-14 09:00");
  });

  it("keeps a monthly reminder on the 31st where the month has one", () => {
    const t = computeTriggerAt(
      at("31 / 01 / 2026", "09:00 AM", "monthly"),
      now,
    );
    expect(dayjs(t!).format("YYYY-MM-DD HH:mm")).toBe("2026-10-31 09:00");
  });

  it("returns the start time when a repeating reminder starts in the future", () => {
    const t = computeTriggerAt(at("20 / 10 / 2026", "09:00 AM", "weekly"), now);
    expect(dayjs(t!).format("YYYY-MM-DD HH:mm")).toBe("2026-10-20 09:00");
  });
});
