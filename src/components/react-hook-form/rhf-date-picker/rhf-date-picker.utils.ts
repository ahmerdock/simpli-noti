import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DATE_FORMAT } from "@/constants/date-time";

dayjs.extend(customParseFormat);

export const DEFAULT_PLACEHOLDER = "DD/MM/YY";
export const DEFAULT_MODAL_TITLE = "Select Date";
export const DEFAULT_DATE_FORMAT = DATE_FORMAT;

export const parseDateValue = (value: string, dateFormat: string): Dayjs => {
  if (!value) return dayjs();

  const parsed = dayjs(value, dateFormat, true);
  return parsed.isValid() ? parsed : dayjs();
};
