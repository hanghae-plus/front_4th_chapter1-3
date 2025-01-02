import { useState } from "react";
import { NotificationContext } from "./context";
import { Notification } from "../../interface/notification";
import { useCallback, useMemo } from "../../hooks";

export const NotificationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (message: string, type: Notification["type"]) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { id: Date.now(), message, type },
      ]);
    },
    [],
  );

  const removeNotification = useCallback((id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id),
    );
  }, []);

  const notificationContextValue = useMemo(
    () => ({ notifications, addNotification, removeNotification }),
    [notifications, addNotification, removeNotification],
  );

  return (
    <NotificationContext.Provider value={notificationContextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
