export type RepeatType = "none" | "daily" | "weekly" | "monthly" | "yearly";

export interface INotification {
  id: string;
  title: string;
  date: string;
  time: string;
  repeat: RepeatType;
  description?: string;
  isActive: boolean;
  createdAt: string;
}

export type NotificationInput = Omit<
  INotification,
  "id" | "createdAt" | "isActive"
>;

export interface INotificationStore {
  notifications: INotification[];
  addNotification: (n: NotificationInput) => void;
  editNotification: (id: string, n: NotificationInput) => void;
  deleteNotification: (id: string) => void;
  toggleNotification: (id: string) => void;
  /** Marks a one-time reminder that has already fired as done. */
  expireNotification: (id: string) => void;
}
