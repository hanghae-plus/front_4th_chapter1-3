/* eslint-disable react-refresh/only-export-components */
import { useMemo, useState } from "react";
import { NotificationType } from "./NotificationSystemProvider.types";
import { createSafeContext } from "../@lib/utils";

interface Props {
  children: React.ReactNode;
}

function NotificationSystemProvider({ children }: Props) {
  const [state, setState] = useState<ContextState>({
    group: new Map(),
  });

  const actions = useMemo<ContextActions>(
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
    <NotificationSystemStateProvider {...state}>
      <NotificationSystemActionsProvider {...actions}>
        {children}
      </NotificationSystemActionsProvider>
    </NotificationSystemStateProvider>
  );
}

// Context API
interface ContextState {
  group: Map<number, NotificationType>;
}

interface ContextActions {
  addNotification(notification: NotificationType): void;
  removeNotification(id: number): void;
}

export const [
  NotificationSystemStateProvider,
  useNotificationSystemStateContext,
] = createSafeContext<ContextState>("NotificationSystemProvider");
export const [
  NotificationSystemActionsProvider,
  useNotificationSystemActionsContext,
] = createSafeContext<ContextActions>("NotificationSystemProvider");

export default NotificationSystemProvider;
