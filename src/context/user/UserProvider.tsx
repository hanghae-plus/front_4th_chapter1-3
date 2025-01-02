import { ReactNode, useState } from "react";
import { useCallback, useMemo } from "../../@lib";
import { IUser } from "../../types";
import { UserContext } from "./UserContext.ts";
import { useNotification } from "../notification";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const { addNotification } = useNotification();

  const login = useCallback(
    (email: string) => {
      setUser({ id: 1, name: "홍길동", email });
      addNotification("성공적으로 로그인 되었습니다.", "success");
    },
    [addNotification],
  );

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃 되었습니다.", "success");
  }, [addNotification]);

  const userContextValue = useMemo(
    () => ({ user, login, logout }),
    [user, login, logout],
  );

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};
