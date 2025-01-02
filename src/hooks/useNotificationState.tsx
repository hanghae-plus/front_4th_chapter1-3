import { useContext } from "react";
import { NotificationStateContext } from "../contexts/NotificationContext";
import type { NotificationStateContextProps } from "../types";

export const useNotificationState = (): NotificationStateContextProps => {
  const context = useContext(NotificationStateContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationState must be used within a NotificationProvider",
    );
  }
  return context;
};
