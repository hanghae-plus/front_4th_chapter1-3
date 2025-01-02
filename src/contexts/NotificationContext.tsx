import React, { createContext, useContext, useState } from "react";
import { INotification } from "../type/type";
import { useCallback, useMemo } from "../@lib";

interface NotificationStateContextType {
  notifications: INotification[];
}

interface NotificationActionContextType {
  addNotification: (message: string, type: INotification["type"]) => void;
  removeNotification: (id: number) => void;
}

const NotificationStateContext = createContext<
  NotificationStateContextType | undefined
>(undefined);

const NotificationActionContext = createContext<
  NotificationActionContextType | undefined
>(undefined);

export const useNotificationStateContext = () => {
  const state = useContext(NotificationStateContext);
  if (state === undefined) {
    throw new Error(
      "useNotificationStateContext must be used within an NotificationContext",
    );
  }
  return state;
};

export const useNotificationActionContext = () => {
  const actions = useContext(NotificationActionContext);
  if (actions === undefined) {
    throw new Error(
      "useNotificationActionContext must be used within an NotificationContext",
    );
  }
  return actions;
};

export const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const addNotification = useCallback(
    (message: string, type: INotification["type"]) => {
      const newNotification: INotification = {
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

  const notificationStateContextValue: NotificationStateContextType = useMemo(
    () => ({
      notifications,
    }),
    [notifications],
  );

  const notificationActionContextValue: NotificationActionContextType = useMemo(
    () => ({
      addNotification,
      removeNotification,
    }),
    [addNotification, removeNotification],
  );

  return (
    <NotificationActionContext.Provider value={notificationActionContextValue}>
      <NotificationStateContext.Provider value={notificationStateContextValue}>
        {children}
      </NotificationStateContext.Provider>
    </NotificationActionContext.Provider>
  );
};
