import type { IRepeatType } from "@/store";

export type IFormValues = {
  title: string;
  date: string;
  time: string;
  repeat: IRepeatType;
  description?: string;
};
