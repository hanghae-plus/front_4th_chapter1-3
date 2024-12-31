import { createContext, ReactNode, useState } from "react";
import { useCallback, useMemo, useNotificationContext } from "../@lib";

interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

interface LoginContextProviderProps {
  children: ReactNode;
}

export const LoginContext = createContext<LoginContextType | undefined>(
  undefined,
);

export const LoginContextProvider = ({
  children,
}: LoginContextProviderProps): JSX.Element => {
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

  const actions: LoginContextType = useMemo(() => {
    return {
      user,
      login,
      logout,
    };
  }, [login, logout, user]);

  return (
    <LoginContext.Provider value={actions}>{children}</LoginContext.Provider>
  );
};
