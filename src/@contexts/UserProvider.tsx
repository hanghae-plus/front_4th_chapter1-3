/* eslint-disable react-refresh/only-export-components */
import { useMemo, useState } from "react";
import { UserType } from "./UserProvider.types";
import { createSafeContext } from "../@lib/utils";

interface Props {
  children?: React.ReactNode;
}

function UserProvider({ children }: Props) {
  const [state, setState] = useState<ContextState>({
    user: null,
  });

  const actions = useMemo<ContextActions>(
    () => ({
      login(user) {
        setState((prev) => ({ ...prev, user }));
      },

      logout() {
        setState((prev) => ({ ...prev, user: null }));
      },
    }),
    [],
  );

  return (
    <UserStateProvider {...state}>
      <UserActionsProvider {...actions}>{children}</UserActionsProvider>
    </UserStateProvider>
  );
}

// Context API
interface ContextState {
  user: UserType | null;
}

interface ContextActions {
  login(user: UserType): void;
  logout(): void;
}

export const [UserStateProvider, useUserStateContext] =
  createSafeContext<ContextState>("UserProvider");
export const [UserActionsProvider, useUserActionsContext] =
  createSafeContext<ContextActions>("UserProvider");

export default UserProvider;
