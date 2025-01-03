// contexts/NotificationContext.tsx
import { createContext, useContext, useState } from "react";
import { Notification } from "../types";
import { useMemo } from "../hooks";

const NotificationsContext = createContext<Notification[] | undefined>(
  undefined,
);

interface NotificationActionsType {
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

const NotificationActionsContext = createContext<
  NotificationActionsType | undefined
>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const actions = useMemo(
    () => ({
      addNotification: (message: string, type: Notification["type"]) => {
        const newNotification: Notification = {
          id: Date.now(),
          message,
          type,
        };
        setNotifications((prev) => [...prev, newNotification]);
      },
      removeNotification: (id: number) => {
        setNotifications((prev) =>
          prev.filter((notification) => notification.id !== id),
        );
      },
    }),
    [],
  );

  return (
    <NotificationActionsContext.Provider value={actions}>
      <NotificationsContext.Provider value={notifications}>
        {children}
      </NotificationsContext.Provider>
    </NotificationActionsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context)
    throw new Error("NotificationProvider 내에서 사용되어야 합니다.");
  return context;
};

export const useNotificationActions = () => {
  const context = useContext(NotificationActionsContext);
  if (!context)
    throw new Error("NotificationProvider 내에서 사용되어야 합니다.");
  return context;
};

export const useNotification = () => {
  return {
    notifications: useNotifications(),
    ...useNotificationActions(),
  };
};
