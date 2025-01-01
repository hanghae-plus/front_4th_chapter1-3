import { useState } from "react";
import { useCallback, useMemo } from "../@lib";
import {
  Notification,
  NotificationActionsContext,
  NotificationContext,
} from "../hooks/useNotificationContext";

export const NotificationProvider = ({
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

  const value = useMemo(() => ({ notifications }), [notifications]);

  const actions = useMemo(
    () => ({ addNotification, removeNotification }),
    [addNotification, removeNotification],
  );

  return (
    <NotificationContext.Provider value={value}>
      <NotificationActionsContext.Provider value={actions}>
        {children}
      </NotificationActionsContext.Provider>
    </NotificationContext.Provider>
  );
};
