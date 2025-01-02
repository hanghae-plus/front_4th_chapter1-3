import { createStore, Store } from "@/storeUtils";
import { Notification } from "@/types";
import { createContext } from "react";

interface NotificationState {
  notifications: Notification[];
}

interface NotificationAction {
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

export type NotificationType = NotificationState & NotificationAction;
export type NotificationStore = Store<NotificationType>;

export const createNotificationStore: () => NotificationStore = () =>
  createStore<NotificationType>((set) => ({
    notifications: [],
    addNotification: (message, type) => {
      const newNotification: Notification = {
        id: Date.now(),
        message,
        type,
      };

      set((prev) => ({
        ...prev,
        notifications: [...prev.notifications, newNotification],
      }));
    },
    removeNotification: (id) => {
      set((prev) => ({
        ...prev,
        notifications: prev.notifications.filter(
          (notification) => notification.id !== id,
        ),
      }));
    },
  }));

export const NotificationContext = createContext<NotificationStore | undefined>(
  undefined,
);
