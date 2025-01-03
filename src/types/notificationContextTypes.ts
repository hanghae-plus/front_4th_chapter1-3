import { Notification, NotificationType } from "./";

export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: NotificationType) => void;
  removeNotification: (id: number) => void;
}

export interface NotificationStateContextProps {
  notifications: Notification[];
}

export interface NotificationActionsContextProps {
  addNotification: (message: string, type: string) => void;
  removeNotification: (id: number) => void;
}
