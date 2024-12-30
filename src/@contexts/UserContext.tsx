/* eslint-disable react-refresh/only-export-components */
import { useMemo, useState } from "react";
import { createSafeContext } from "../@lib/utils/createSafeContext";
import { UserType } from "./UserContext.types";

interface Props {
  children: React.ReactNode;
}

function UserProvider({ children }: Props) {
  const [state, setState] = useState<UserContextState>({
    user: null,
  });

  const actions = useMemo<UserContextActions>(
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
export interface UserContextState {
  user: UserType | null;
}

export interface UserContextActions {
  login(user: UserType): void;
  logout(): void;
}

export const [UserStateProvider, useUserStateContext] =
  createSafeContext<UserContextState>("UserProvider");
export const [UserActionsProvider, useUserActionsContext] =
  createSafeContext<UserContextActions>("UserProvider");

export default UserProvider;
