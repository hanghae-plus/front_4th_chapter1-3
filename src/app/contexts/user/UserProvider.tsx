import { User } from "@/types";
import { PropsWithChildren, useState } from "react";
import { useNotificationContext } from "../notification";
import { useCallback, useMemo } from "@lib/hooks";
import { UserContext, UserContextType } from "./UserContext";

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const { addNotification } = useNotificationContext();

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

  const contextValue = useMemo<UserContextType>(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
