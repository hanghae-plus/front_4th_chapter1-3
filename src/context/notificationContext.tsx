import { createContext, useContext } from "react";
import { NotificationContextType } from "../types/notificationContext";

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationContext must be used within a NotificationContext.Provider",
    );
  }
  return context;
};
