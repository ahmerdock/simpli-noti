import { isInThePast, NotificationService } from "@/services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type {
  INotification,
  INotificationStore,
} from "./notifications.interface";
import { parseStoredNotifications } from "./notifications.utils";

export const useNotificationStore = create<INotificationStore>()(
  persist(
    (set, get) => {
      const syncById = (id: string) =>
        void NotificationService.syncWithPermission(
          () => get().notifications.find((item) => item.id === id),
          () => get().expireNotification(id),
        );

      return {
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
          syncById(item.id);
        },

        editNotification: (id, n) => {
          set((state) => ({
            notifications: state.notifications.map((item) => {
              if (item.id !== id) return item;
              // An expired one-time reminder moved to a future time is live again.
              const wasExpired =
                !item.isActive && item.repeat === "none" && isInThePast(item);
              const revive = wasExpired && !isInThePast(n);
              return { ...item, ...n, isActive: revive ? true : item.isActive };
            }),
          }));
          syncById(id);
        },

        deleteNotification: (id) => {
          set((state) => ({
            notifications: state.notifications.filter((item) => item.id !== id),
          }));
          // If the native cancel fails, the next reconcile removes the orphan alarm.
          NotificationService.cancelNotification(id).catch(() => undefined);
        },

        toggleNotification: (id) => {
          set((state) => ({
            notifications: state.notifications.map((item) =>
              item.id === id ? { ...item, isActive: !item.isActive } : item,
            ),
          }));
          syncById(id);
        },

        expireNotification: (id) =>
          set((state) => ({
            notifications: state.notifications.map((item) =>
              item.id === id && item.isActive && item.repeat === "none"
                ? { ...item, isActive: false }
                : item,
            ),
          })),
      };
    },
    {
      name: "notifications-storage",
      storage: createJSONStorage(() => AsyncStorage),
      merge: (persisted, current) => ({
        ...current,
        notifications: parseStoredNotifications(persisted) ?? current.notifications,
      }),
    },
  ),
);
