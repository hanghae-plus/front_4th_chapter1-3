import { PropsWithChildren } from "react";
import {
  NotificationContext,
  NotificationStore,
  createNotificationStore,
} from "./NotificationContext";
import { useRef } from "@lib/hooks";

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const store = useRef<NotificationStore | null>(null);

  if (store.current === null) {
    store.current = createNotificationStore();
  }

  return (
    <NotificationContext.Provider value={store.current}>
      {children}
    </NotificationContext.Provider>
  );
};
