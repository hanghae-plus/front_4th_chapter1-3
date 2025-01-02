import { createContextHook } from "../../utils/function/createContextHook";

export interface INotification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

interface NotificationContextType {
  notifications: INotification[];
  addNotification: (message: string, type: INotification["type"]) => void;
  removeNotification: (id: number) => void;
}

export const [NotificationContext, useNotificationContext] =
  createContextHook<NotificationContextType>("Notification");
