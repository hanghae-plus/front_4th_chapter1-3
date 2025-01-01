import { useContext } from "react";
import { createContext } from "react";

export interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

interface NotificationContextType {
  notifications: Notification[];
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);
export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider",
    );
  }
  return context;
};

interface NotificationActionsType {
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

export const NotificationActionsContext = createContext<
  NotificationActionsType | undefined
>(undefined);
export const useNotificationActions = () => {
  const context = useContext(NotificationActionsContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationActions must be used within a NotificationProvider",
    );
  }
  return context;
};
