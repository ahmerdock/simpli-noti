import type { RepeatType } from "@/store";

export type FormValues = {
  title: string;
  date: string;
  time: string;
  repeat: RepeatType;
  description?: string;
};
