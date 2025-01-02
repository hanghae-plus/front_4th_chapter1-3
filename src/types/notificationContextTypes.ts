import { Notification, NotificationType } from "./";

export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: NotificationType) => void;
  removeNotification: (id: number) => void;
}
