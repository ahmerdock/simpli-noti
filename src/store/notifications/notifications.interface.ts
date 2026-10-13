export type IRepeatType = "none" | "daily" | "weekly" | "monthly" | "yearly";

export interface INotification {
  id: string;
  title: string;
  date: string;
  time: string;
  repeat: IRepeatType;
  description?: string;
  isActive: boolean;
  createdAt: string;
}

type INotificationInput = Omit<INotification, "id" | "createdAt" | "isActive">;

export interface INotificationStore {
  notifications: INotification[];
  addNotification: (n: INotificationInput) => void;
  editNotification: (id: string, n: INotificationInput) => void;
  deleteNotification: (id: string) => void;
  toggleNotification: (id: string) => void;
  /** Marks a one-time reminder that has already fired as done. */
  expireNotification: (id: string) => void;
}
