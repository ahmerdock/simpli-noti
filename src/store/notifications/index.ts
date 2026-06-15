import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type RepeatType = "none" | "daily" | "weekly" | "monthly" | "yearly";

export interface INotification {
  id: string;
  title: string;
  date: string;
  time: string;
  repeat: RepeatType;
  description?: string;
  createdAt: string;
}

interface INotificationStore {
  notifications: INotification[];
  addNotification: (n: Omit<INotification, "id" | "createdAt">) => void;
  editNotification: (
    id: string,
    n: Omit<INotification, "id" | "createdAt">,
  ) => void;
  deleteNotification: (id: string) => void;
}

export const useNotificationStore = create<INotificationStore>()(
  persist(
    (set) => ({
      notifications: [],

      addNotification: (n) =>
        set((state) => ({
          notifications: [
            ...state.notifications,
            {
              ...n,
              id: Date.now().toString(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      editNotification: (id, n) =>
        set((state) => ({
          notifications: state.notifications.map((item) =>
            item.id === id ? { ...item, ...n } : item,
          ),
        })),

      deleteNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "notifications-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
