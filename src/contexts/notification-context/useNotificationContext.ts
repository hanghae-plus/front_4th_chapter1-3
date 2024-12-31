import { createContext, useContext } from "react";

type NotificationType = "success" | "error" | "warning" | "info";

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

export const NotifiactionContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const useGetNotifiactions = () => {
  const context = useContext(NotifiactionContext);
  if (context === undefined) {
    throw new Error("useGetNotifiactions must be used within an AppProvider");
  }
  return context.notifications;
};

export const useGetNoticationActions = () => {
  const context = useContext(NotifiactionContext);
  if (context === undefined) {
    throw new Error(
      "useGetNoticationActions must be used within an AppProvider",
    );
  }
  return context.actions;
};
