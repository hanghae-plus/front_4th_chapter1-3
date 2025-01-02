import { createContext, useContext, useState } from "react";
import { Notification } from "../type/notifivation.type";
import { useCallback, useMemo } from "../hooks";

interface NotificationStateContextType {
  notifications: Notification[];
}

interface NotificationActionContextType {
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

const NotificationStateContext = createContext<
  NotificationStateContextType | undefined
>(undefined);
const NotificationActionContext = createContext<
  NotificationActionContextType | undefined
>(undefined);

export const useNotificationState = () => {
  const context = useContext(NotificationStateContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationState must be used within an NotificationProvider",
    );
  }
  return context;
};

export const useNotificationAction = () => {
  const context = useContext(NotificationActionContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationAction must be used within an NotificationProvider",
    );
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
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

  const stateValue = useMemo(() => ({ notifications }), [notifications]);

  const actionValue = useMemo(
    () => ({ addNotification, removeNotification }),
    [addNotification, removeNotification],
  );

  return (
    <NotificationStateContext.Provider value={stateValue}>
      <NotificationActionContext.Provider value={actionValue}>
        {children}
      </NotificationActionContext.Provider>
    </NotificationStateContext.Provider>
  );
};
