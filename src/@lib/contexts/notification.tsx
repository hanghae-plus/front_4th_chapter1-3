import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useCallback, useMemo } from "../hooks";

type NotificationType = "info" | "success" | "warning" | "error";

interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: NotificationType) => void;
  removeNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const addNotification = useCallback(
    (message: string, type: NotificationType) => {
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
      prev.filter((notifications) => notifications.id !== id),
    );
  }, []);
  const value = useMemo(
    () => ({ notifications, addNotification, removeNotification }),
    [notifications, addNotification, removeNotification],
  );
  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within an NotificationProvider",
    );
  }
  return context;
};
