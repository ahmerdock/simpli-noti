import { NotificationService } from "@/services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type {
  INotification,
  INotificationStore,
} from "./notifications.interface";

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
        void NotificationService.syncWithPermission(
          () => get().notifications.find((x) => x.id === item.id),
          () => get().expireNotification(item.id),
        );
      },

      editNotification: (id, n) => {
        set((state) => ({
          notifications: state.notifications.map((item) =>
            item.id === id ? { ...item, ...n } : item,
          ),
        }));
        void NotificationService.syncWithPermission(
          () => get().notifications.find((item) => item.id === id),
          () => get().expireNotification(id),
        );
      },

      deleteNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((item) => item.id !== id),
        }));
        // If the native cancel fails, the next reconcile removes the orphan alarm.
        NotificationService.cancelNotification(id).catch(() => {});
      },

      toggleNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.map((item) =>
            item.id === id ? { ...item, isActive: !item.isActive } : item,
          ),
        }));
        // syncNotification arms when active, cancels when inactive.
        void NotificationService.syncWithPermission(
          () => get().notifications.find((item) => item.id === id),
          () => get().expireNotification(id),
        );
      },

      expireNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.map((item) =>
            item.id === id && item.isActive && item.repeat === "none"
              ? { ...item, isActive: false }
              : item,
          ),
        })),
    }),
    {
      name: "notifications-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
