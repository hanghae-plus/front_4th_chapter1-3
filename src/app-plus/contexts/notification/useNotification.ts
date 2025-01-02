import { useContext } from "react";
import { NotificationContext, NotificationType } from "./NotificationContext";
import { useStore } from "@lib/hooks";

export const useNotificationStore = <S>(
  selector: (store: NotificationType) => S,
) => {
  const store = useContext(NotificationContext);
  if (store === undefined) {
    throw new Error(
      "useNotificationContext must be used within an NotificationProvider",
    );
  }
  return useStore(store, selector);
};
