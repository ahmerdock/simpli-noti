import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NotificationService } from "@/services/notifications";

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

interface INotificationStore {
  notifications: INotification[];
  addNotification: (
    n: Omit<INotification, "id" | "createdAt" | "isActive">,
  ) => void;
  editNotification: (
    id: string,
    n: Omit<INotification, "id" | "createdAt" | "isActive">,
  ) => void;
  deleteNotification: (id: string) => void;
  toggleNotification: (id: string) => void;
}

export const useNotificationStore = create<INotificationStore>()(
  persist(
    (set, get) => ({
      notifications: [],

      addNotification: (n) => {
        const item: INotification = {
          ...n,
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          isActive: true,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          notifications: [...state.notifications, item],
        }));
        // Keep the native scheduled alarm in sync with the new record.
        void NotificationService.syncWithPermission(item);
      },

      editNotification: (id, n) => {
        set((state) => ({
          notifications: state.notifications.map((item) =>
            item.id === id ? { ...item, ...n } : item,
          ),
        }));
        const updated = get().notifications.find((item) => item.id === id);
        if (updated) void NotificationService.syncWithPermission(updated);
      },

      deleteNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((item) => item.id !== id),
        }));
        void NotificationService.cancelNotification(id);
      },

      toggleNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.map((item) =>
            item.id === id ? { ...item, isActive: !item.isActive } : item,
          ),
        }));
        // syncNotification arms when active, cancels when inactive.
        const updated = get().notifications.find((item) => item.id === id);
        if (updated) void NotificationService.syncWithPermission(updated);
      },
    }),
    {
      name: "notifications-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
