/* eslint-disable react-refresh/only-export-components */
import { memo, useMemo, useState } from "react";
import { createSafeContext } from "../@lib/utils/createSafeContext";

interface Props {
  children: React.ReactNode;
}

function NotificationProvider({ children }: Props) {
  const [state, setState] = useState<NotificationState>({
    notifications: [],
  });

  const actions = useMemo<NotificationActions>(
    () => ({
      addNotification(message, type) {
        const id = Date.now();
        setState((prev) => ({
          ...prev,
          notifications: [...prev.notifications, { id, type, message }],
        }));
      },

      removeNotification(id) {
        setState((prev) => ({
          notifications: prev.notifications.filter(
            (notification) => notification.id !== id,
          ),
        }));
      },
    }),
    [],
  );

  return (
    <NotificationStateProvider {...state}>
      <NotificationActionsProvider {...actions}>
        {children}
      </NotificationActionsProvider>
    </NotificationStateProvider>
  );
}

// Context API
export interface NotificationType {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

export interface NotificationState {
  notifications: NotificationType[];
}

export interface NotificationActions {
  addNotification(message: string, type: NotificationType["type"]): void;
  removeNotification(id: number): void;
}

export const [NotificationStateProvider, useNotificationStateContext] =
  createSafeContext<NotificationState>("NotificationProvider");
export const [NotificationActionsProvider, useNotificationActionsContext] =
  createSafeContext<NotificationActions>("NotificationProvider");

export default memo(NotificationProvider);
