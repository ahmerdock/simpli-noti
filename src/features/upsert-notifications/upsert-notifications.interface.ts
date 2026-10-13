import type { IRepeatType } from "@/store";

export interface IFormValues {
  title: string;
  date: string;
  time: string;
  repeat: IRepeatType;
  description?: string;
}
