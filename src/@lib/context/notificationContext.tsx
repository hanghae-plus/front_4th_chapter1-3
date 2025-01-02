import { useContext, createContext } from "react";
import { notificationContextType } from "../components/type";

export const NotificationContext = createContext<notificationContextType | undefined>(
  undefined
);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotificationContext must be used within a notificationContext");
  }
  return context;
};
