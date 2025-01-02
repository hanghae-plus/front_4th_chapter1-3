import { useContext } from "react";
import {
  NotificationContext,
  NotificationContextType,
} from "../store/NotificationContext";

export const useNotificationContext = (): NotificationContextType => {
  const notificationContext = useContext(NotificationContext);

  if (!notificationContext) {
    throw Error(
      "useNotificationContext 는 NotificationProvider 내부에서만 사용되어야 합니다.",
    );
  }

  return notificationContext;
};
