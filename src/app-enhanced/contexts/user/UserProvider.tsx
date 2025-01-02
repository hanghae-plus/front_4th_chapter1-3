import { useCallback, useMemo } from "@lib/hooks";
import { User } from "@/types";
import { PropsWithChildren, useState } from "react";
import { useNotificationAction } from "../notification";
import {
  UserAction,
  UserActionContext,
  UserState,
  UserStateContext,
} from "./UserContext";

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const { addNotification } = useNotificationAction();

  const login = useCallback(
    (email: string) => {
      setUser({ id: 1, name: "홍길동", email });
      addNotification("성공적으로 로그인되었습니다", "success");
    },
    [addNotification],
  );

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, [addNotification]);

  const userState = useMemo<UserState>(
    () => ({
      user,
    }),
    [user],
  );

  const userAction = useMemo<UserAction>(
    () => ({
      login,
      logout,
    }),
    [login, logout],
  );

  return (
    <UserActionContext.Provider value={userAction}>
      <UserStateContext.Provider value={userState}>
        {children}
      </UserStateContext.Provider>
    </UserActionContext.Provider>
  );
};
