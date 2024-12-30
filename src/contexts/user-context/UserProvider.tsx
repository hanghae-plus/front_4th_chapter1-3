import { PropsWithChildren, useCallback, useState } from "react";
import { useMemo } from "../../@lib";
import { User, UserContext } from "./useUserContext";
import { useGetNoticationActions } from "../notification-context/useNotificationContext";

export const UserProvider = ({ children }: PropsWithChildren) => {
  const { addNotification } = useGetNoticationActions();

  const [user, setUser] = useState<User | null>(null);

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

  const contextValue = useMemo(() => {
    return {
      user,
      actions: {
        login,
        logout,
      },
    };
  }, [login, logout, user]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
