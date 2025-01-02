import { createContext } from "react";
import { NotificationContextType } from "../../interface/notification";

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);
