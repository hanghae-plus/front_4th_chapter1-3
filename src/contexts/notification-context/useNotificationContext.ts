import { createContext, useContext } from "react";

export type NotificationType = "success" | "error" | "warning" | "info";

interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  notifications: Notification[];
  actions: {
    removeNotification: (id: number) => void;
    addNotification: (message: string, type: Notification["type"]) => void;
  };
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const useGetNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useGetNotifications must be used within an AppProvider");
  }
  return context.notifications;
};

export const useGetNotificationActions = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useGetNotificationActions must be used within an AppProvider",
    );
  }
  return context.actions;
};
