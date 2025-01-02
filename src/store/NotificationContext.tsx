import { createContext, ReactNode, useState } from "react";
import { memo, useCallback, useMemo } from "../@lib";

type NotificationType = "info" | "success" | "warning" | "error";

interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}

export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notificationsState, setNotificationsState] = useState<Notification[]>(
    [],
  );

  const addNotification = useCallback(
    (message: string, type: NotificationType) => {
      const newNotification: Notification = {
        id: Date.now(),
        message,
        type,
      };

      setNotificationsState((prev) => [...prev, newNotification]);
    },
    [],
  );

  const removeNotification = useCallback((id: number) => {
    setNotificationsState((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }, []);

  const value: NotificationContextType = useMemo(() => {
    return {
      notifications: notificationsState,
      addNotification,
      removeNotification,
    };
  }, [addNotification, notificationsState, removeNotification]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default memo(NotificationProvider);
