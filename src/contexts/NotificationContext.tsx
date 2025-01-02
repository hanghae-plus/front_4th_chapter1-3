import { createContext, useState } from "react";
import { useCallback, useMemo } from "../@lib";
import { NotificationContextType, NotificationType } from "../types";

const NotiData = {
  notifications: [],
  addNotification: (message: string, type: NotificationType["type"]) => {
    console.error(message, type);
  },
  removeNotification: (id: number) => {
    console.error(id);
  },
};

export const NotificationContext =
  createContext<NotificationContextType>(NotiData);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const addNotification = useCallback(
    (message: string, type: NotificationType["type"]) => {
      const newNotification: NotificationType = {
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

  const notiValue = useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
    }),
    [notifications],
  );

  return (
    <NotificationContext.Provider value={notiValue}>
      {children}
    </NotificationContext.Provider>
  );
};
