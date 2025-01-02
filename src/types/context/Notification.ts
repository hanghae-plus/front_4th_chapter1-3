import { INotification } from "../Notification.ts";

export interface INotificationContext {
  notifications: INotification[] | [];
  addNotification: (message: string, type: INotification["type"]) => void;
  removeNotification: (id: number) => void;
}
