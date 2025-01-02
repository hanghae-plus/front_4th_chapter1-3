import { useContext } from "react";
import { NotificationContext } from "../context/notification";

// 커스텀 훅: useAppContext
export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider",
    );
  }
  return context;
};
