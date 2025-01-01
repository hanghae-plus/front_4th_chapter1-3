import { ReactNode, useState } from "react";
import { AppContext } from "./AppContext";
import { Notification } from "../../features/notification/entity";

import { generateItems } from "../../utils";
import { useMemo } from "../../@lib";
import { AppContextType } from "./type";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [items, setItems] = useState(generateItems(1000));

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

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

  const value: AppContextType = useMemo(
    () => ({
      theme,
      toggleTheme,
      notifications,
      addNotification,
      removeNotification,
      items,
      addItems,
    }),
    [theme, toggleTheme],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
