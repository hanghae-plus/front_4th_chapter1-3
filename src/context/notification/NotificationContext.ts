import { createContext, useContext } from "react";
import { INotificationContext } from "../../types/context";

export const NotificationContext = createContext<INotificationContext | null>(
  null,
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === null) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};
