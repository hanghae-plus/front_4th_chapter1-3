/* eslint-disable react-refresh/only-export-components */
import { memo, useMemo, useState } from "react";
import { createSafeContext } from "../@lib/utils/createSafeContext";

interface Props {
  children: React.ReactNode;
}

function UserProvider({ children }: Props) {
  const [state, setState] = useState<UserState>({
    user: null,
  });

  const actions = useMemo<UserActions>(
    () => ({
      login(email) {
        setState((prev) => ({
          ...prev,
          user: { email, id: 1, name: "홍길동" },
        }));
      },

      logout() {
        setState((prev) => ({
          ...prev,
          user: null,
        }));
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
export interface UserType {
  id: number;
  name: string;
  email: string;
}

export interface UserState {
  user: UserType | null;
}

export interface UserActions {
  login(email: string, password: string): void;
  logout(): void;
}

export const [UserStateProvider, useUserStateContext] =
  createSafeContext<UserState>("UserProvider");
export const [UserActionsProvider, useUserActionsContext] =
  createSafeContext<UserActions>("UserProvider");

export default memo(UserProvider);
