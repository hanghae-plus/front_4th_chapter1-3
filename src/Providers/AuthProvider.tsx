import { useState } from "react";
import { useCallback, useMemo } from "../@lib";
import { AuthContext, User } from "../hooks/useAuthContext";
import { useNotificationContext } from "../hooks/useNotificationContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const { addNotification } = useNotificationContext();

  const login = useCallback(
    (email: string) => {
      const user: User = { id: 1, name: "홍길동", email };
      setUser(user);
      addNotification("성공적으로 로그인되었습니다", "success");

      return user;
    },
    [addNotification],
  );

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, [addNotification]);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
