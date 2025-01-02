import { useState } from "react";
import { useCallback, useMemo } from "@/@lib";
import { NotificationContext } from "@/context/create-contexts";
import { Notification } from "@/types/notification.types";

export const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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

  const value = useMemo(
    () => ({
      addNotification,
      removeNotification,
      notifications,
    }),
    [addNotification, removeNotification, notifications],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
