import { useContext } from "react";
import {
  NotificationActionContext,
  NotificationStateContext,
} from "./NotificationContext";

export const useNotificationState = () => {
  const context = useContext(NotificationStateContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationState must be used within an NotificationProvider",
    );
  }
  return context;
};

export const useNotificationAction = () => {
  const context = useContext(NotificationActionContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationAction must be used within an NotificationProvider",
    );
  }
  return context;
};
