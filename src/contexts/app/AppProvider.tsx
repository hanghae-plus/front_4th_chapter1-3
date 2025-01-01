import { ReactNode, useState } from "react";
import { AppContext } from "./AppContext";
import { Notification } from "../../features/notification/entity";

import { generateItems } from "../../utils";
import { AppContextType } from "./type";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [items, setItems] = useState(generateItems(1000));

  const addNotification = (message: string, type: Notification["type"]) => {
    const newNotification: Notification = {
      id: Date.now(),
      message,
      type,
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

  const value: AppContextType = {
    notifications,
    addNotification,
    removeNotification,
    items,
    addItems,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
