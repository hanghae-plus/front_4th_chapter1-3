import { useState } from "react";
import { AuthContext } from "../hooks/useAuth";
import { useMemo } from "../@lib";
import { User } from "../Interface";
import { useNotificationContext } from "../hooks/useNotification";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { addNotification } = useNotificationContext();

  const login = (email: string, password: string) => {
    setUser({ id: 1, name: "홍길동", email, password });
    addNotification("성공적으로 로그인되었습니다", "success");
  };

  const logout = () => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
