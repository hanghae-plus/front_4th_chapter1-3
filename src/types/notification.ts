export interface NotificationType {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}
export interface NotificationContextType {
  notifications: NotificationType[] | [];
  addNotification: (message: string, type: NotificationType["type"]) => void;
  removeNotification: (id: number) => void;
}
