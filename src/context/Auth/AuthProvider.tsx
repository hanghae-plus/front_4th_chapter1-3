import { User } from "../../types";
import { useCallback, useMemo } from "../../@lib";
import { useAppContext } from "../App/useAppContext";
import { useState } from "react";
import { AuthContextType } from "./types";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { addNotification } = useAppContext();
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(
    (email: string) => {
      setUser({ id: 1, email, name: "홍길동" });
      addNotification("성공적으로 로그인되었습니다", "success");
    },
    [addNotification],
  );

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, [addNotification]);

  const value: AuthContextType = useMemo(() => {
    return {
      user,
      login,
      logout,
    };
  }, [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
