import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Notification } from "../types";

// 1. type
interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: string) => void;
  removeNotification: (id: number) => void;
}

interface PropsWithChildren {
  children: React.ReactNode;
}

// 2. context
const NotificationContext = createContext<NotificationContextType | null>(null);

// 3. provider
export const NotificationContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((message: string, type: string) => {
    setNotifications((prev) => [...prev, { id: Date.now(), message, type }]);
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  const value = useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
    }),
    [notifications, addNotification, removeNotification]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// 4. hook
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  return context;
};
