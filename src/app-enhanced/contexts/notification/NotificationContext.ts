import { Notification } from "@/types";
import { createContext } from "react";

export interface NotificationState {
  notifications: Notification[];
}

export interface NotificationAction {
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

export const NotificationStateContext = createContext<
  NotificationState | undefined
>(undefined);

export const NotificationActionContext = createContext<
  NotificationAction | undefined
>(undefined);
