import { createContext, useContext, useMemo, useState } from "react";
import { User } from "../type/user.type";
import { useCallback } from "../hooks";

// AppContext 타입 정의
interface AppContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// 커스텀 훅: useAppContext
export const useUserContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const login = useCallback((email: string) => {
    setUser({ id: 1, name: "홍길동", email });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const contextValue = useMemo(
    () => ({ user, login, logout }),
    [user, login, logout],
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
