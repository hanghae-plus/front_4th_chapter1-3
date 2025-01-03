import { Notification } from "../../types";
import { useCallback, useMemo } from "../../@lib";
import { useState } from "react";
import { AppContextType } from "./types";
import { AppContext } from "./AppContext";

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

  const value: AppContextType = useMemo(() => {
    return {
      notifications,
      addNotification,
      removeNotification,
    };
  }, [notifications, addNotification, removeNotification]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}