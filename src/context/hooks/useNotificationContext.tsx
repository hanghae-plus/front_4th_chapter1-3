import { useContext } from "react";
import { NotificationContext } from "@/context/create-contexts";

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("Cannot find NotificationContext");
  }
  return context;
};
