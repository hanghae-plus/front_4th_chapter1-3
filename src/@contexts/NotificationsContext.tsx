/* eslint-disable react-refresh/only-export-components */
import { useMemo, useState } from "react";
import { createSafeContext } from "../@lib/utils/createSafeContext";
import { NotificationType } from "./NotificationsContext.types";

interface Props {
  children: React.ReactNode;
}

function NotificationsProvider({ children }: Props) {
  const [state, setState] = useState<NotificationsContextState>({
    group: new Map(),
  });

  const actions = useMemo<NotificationsContextActions>(
    () => ({
      addNotification(notification) {
        const id = Date.now();
        setState(({ group, ...rest }) => {
          const cloned = new Map(group);
          cloned.set(id, notification);
          return { ...rest, group: cloned };
        });
      },

      removeNotification(id) {
        setState(({ group, ...rest }) => {
          const cloned = new Map(group);
          cloned.delete(id);
          return { ...rest, group: cloned };
        });
      },
    }),
    [],
  );

  return (
    <NotificationsStateProvider {...state}>
      <NotificationsActionsProvider {...actions}>
        {children}
      </NotificationsActionsProvider>
    </NotificationsStateProvider>
  );
}

// Context API
export interface NotificationsContextState {
  group: Map<number, NotificationType>;
}

export interface NotificationsContextActions {
  addNotification(notification: NotificationType): void;
  removeNotification(id: number): void;
}

export const [NotificationsStateProvider, useNotificationsStateContext] =
  createSafeContext<NotificationsContextState>("NotificationProvider");
export const [NotificationsActionsProvider, useNotificationsActionsContext] =
  createSafeContext<NotificationsContextActions>("NotificationProvider");

export default NotificationsProvider;
