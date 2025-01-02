import { Notification } from "@/types";
import { useCallback, useMemo } from "@lib/hooks";
import { PropsWithChildren, useState } from "react";
import {
  NotificationAction,
  NotificationActionContext,
  NotificationState,
  NotificationStateContext,
} from "./NotificationContext";

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

  const notificationState = useMemo<NotificationState>(
    () => ({
      notifications,
    }),
    [notifications],
  );

  const notificationAction = useMemo<NotificationAction>(
    () => ({
      addNotification,
      removeNotification,
    }),
    [addNotification, removeNotification],
  );

  return (
    <NotificationActionContext.Provider value={notificationAction}>
      <NotificationStateContext.Provider value={notificationState}>
        {children}
      </NotificationStateContext.Provider>
    </NotificationActionContext.Provider>
  );
};
