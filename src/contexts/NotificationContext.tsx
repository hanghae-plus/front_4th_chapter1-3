// contexts/NotificationContext.tsx

import React, {
  createContext,
  useCallback,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { Notification } from "../types";

interface NotificationStateContextProps {
  notifications: Notification[];
}

interface NotificationActionsContextProps {
  addNotification: (message: string, type: string) => void;
  removeNotification: (id: number) => void;
}

export const NotificationStateContext = createContext<
  NotificationStateContextProps | undefined
>(undefined);
export const NotificationActionsContext = createContext<
  NotificationActionsContextProps | undefined
>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((message: string, type: string) => {
    const newNotification: Notification = {
      id: Date.now(),
      message,
      type,
    };
    setNotifications((prev) => [...prev, newNotification]);
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }, []);

  // actions 객체를 useMemo로 메모이제이션
  const actions = useMemo(
    () => ({ addNotification, removeNotification }),
    [addNotification, removeNotification],
  );

  return (
    <NotificationStateContext.Provider value={{ notifications }}>
      <NotificationActionsContext.Provider value={actions}>
        {children}
      </NotificationActionsContext.Provider>
    </NotificationStateContext.Provider>
  );
};
