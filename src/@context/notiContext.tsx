import { createContext, ReactNode, useContext, useState } from "react";
import { INotificationContext } from "../types/Context";
import { useCallback, useMemo } from "../@lib";
import { INotification } from "../types/Notification";

export const NotiContext = createContext<INotificationContext | undefined>(
  undefined
);

export const useNotiContext = () => {
  const context = useContext(NotiContext);
  if (context === undefined) {
    throw new Error("useNotiContext must be used within an AppProvider");
  }
  return context;
};

export const NotiProvider = (children: ReactNode) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const addNotification = useCallback(
    (message: string, type: INotification["type"]) => {
      const newNotification: INotification = {
        id: Date.now(),
        message,
        type
      };
      setNotifications((prev) => [...prev, newNotification]);
    },
    []
  );

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  const contextValue = useMemo(
    () => ({ notifications, addNotification, removeNotification }),
    [notifications, addNotification, removeNotification]
  );

  return (
    <NotiContext.Provider value={contextValue}>{children}</NotiContext.Provider>
  );
};
