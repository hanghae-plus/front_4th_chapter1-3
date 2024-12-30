import { createContext, PropsWithChildren, useContext } from "react";
import { useRef, useStore } from "../../@lib";
import { createStore, Store } from "../../storeUtils";

interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

interface NotificationState {
  notifications: Notification[];
}

interface NotificationActions {
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

type NotificationType = NotificationState & NotificationActions;
type NotificationStore = Store<NotificationType>;

const notificationStore: NotificationStore = createStore<NotificationType>(
  (set) => ({
    notifications: [],
    addNotification: (message, type) => {
      const newNotification: Notification = {
        id: Date.now(),
        message,
        type,
      };

      set((prev) => ({
        ...prev,
        notifications: [...prev.notifications, newNotification],
      }));
    },
    removeNotification: (id) => {
      set((prev) => ({
        ...prev,
        notifications: prev.notifications.filter(
          (notification) => notification.id !== id,
        ),
      }));
    },
  }),
);

const NotificationContext = createContext<NotificationStore | undefined>(
  undefined,
);

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const store = useRef<NotificationStore | null>(null);

  if (store.current === null) {
    store.current = notificationStore;
  }

  return (
    <NotificationContext.Provider value={store.current}>
      {children}
    </NotificationContext.Provider>
  );
};

const useNotificationStore = <S,>(selector: (store: NotificationType) => S) => {
  const store = useContext(NotificationContext);
  if (store === undefined) {
    throw new Error(
      "useNotificationContext must be used within an NotificationProvider",
    );
  }
  return useStore(store, selector);
};

export { NotificationProvider, useNotificationStore };
