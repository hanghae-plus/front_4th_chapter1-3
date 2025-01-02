import { Notification } from "@/types";
import { createContext } from "react";

interface NotificationState {
  notifications: Notification[];
}

interface NotificationAction {
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

export type NotificationContextType = NotificationState & NotificationAction;

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);
