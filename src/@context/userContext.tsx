import { createContext, useCallback, useContext, useState } from "react";
import { IContextProps, IUserContext } from "../types/Context";
import { useMemo } from "../@lib";
import { IUser } from "../types/User";
import { useNotiContext } from "./notiContext";

export const UserContext = createContext<IUserContext | undefined>(undefined);
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useNotiContext must be used within an AppProvider");
  }
  return context;
};

export const UserProvider = ({ children }: IContextProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const { addNotification } = useNotiContext();

  const login = useCallback((email: string) => {
    setUser({ id: 1, name: "홍길동", email });
    addNotification("성공적으로 로그인되었습니다", "success");
  }, []);
  // const logout = useCallback(() => {}, []);
  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃 되었습니다.", "success");
  }, [addNotification]);

  const contextValue = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user, login, logout]
  );
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
