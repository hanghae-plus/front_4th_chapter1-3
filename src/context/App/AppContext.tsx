import { createContext, useState } from "react";
import { AppContextType, Notification } from "../../types";
import { useCallback } from "../../@lib";

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
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

  const value: AppContextType = {
    notifications,
    addNotification,
    removeNotification,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
