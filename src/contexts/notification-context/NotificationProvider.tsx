import { PropsWithChildren, useCallback, useState } from "react";
import { useMemo } from "../../@lib";
import { NotificationContext } from "./useNotificationContext";

interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

export const NotificationProvider = ({ children }: PropsWithChildren) => {
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

  const contextValue = useMemo(() => {
    return {
      notifications,
      actions: {
        addNotification,
        removeNotification,
      },
    };
  }, [addNotification, notifications, removeNotification]);

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
