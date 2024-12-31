import { createContext, ReactNode, useState } from "react";
import { useCallback, useMemo } from "../@lib";

export interface User {
  id: number;
  name: string;
  email: string;
}

interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

interface NotificationContextProviderProps {
  children: ReactNode;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const NotificationContextProvider = ({
  children,
}: NotificationContextProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (message: string, type: Notification["type"]) => {
      const newNotification: Notification = {
        id: Date.now(),
        message,
        type,
      };
      setNotifications((prev) => [...prev, newNotification]);
    },
    [],
  );

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }, []);

  const actions: NotificationContextType = useMemo(() => {
    return {
      notifications,
      addNotification,
      removeNotification,
    };
  }, [addNotification, notifications, removeNotification]);

  return (
    <NotificationContext.Provider value={actions}>
      {children}
    </NotificationContext.Provider>
  );
};
