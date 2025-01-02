import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useCallback, useMemo } from "../hooks";
import { useNotification } from "./notification";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // Header컴포넌트의 재 렌더링 방지를 위해, UserProvider에서 처리
  const { addNotification } = useNotification();

  const [user, setUser] = useState<User | null>(null);
  const login = useCallback((email: string) => {
    setUser({ id: 1, name: "홍길동", email });
    addNotification("성공적으로 로그인되었습니다", "success");
  }, []);
  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, []);
  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within an UserProvider");
  }
  return context;
};
