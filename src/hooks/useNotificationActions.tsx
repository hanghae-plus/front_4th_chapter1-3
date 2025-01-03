import { useContext } from "react";
import { NotificationActionsContext } from "../contexts/NotificationContext";
import type { NotificationActionsContextProps } from "../types";

export const useNotificationActions = (): NotificationActionsContextProps => {
  const context = useContext(NotificationActionsContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationActions must be used within a NotificationProvider",
    );
  }
  return context;
};
