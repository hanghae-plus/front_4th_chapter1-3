import React, { createContext, useContext, useState } from "react";
import { IUser } from "../type/type";
import { useCallback, useMemo } from "../@lib";
import { useNotificationContext } from "./NotificationContext";

interface UserContextType {
  user: IUser | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      "useUserContext must be used within an UserContextProvider",
    );
  }
  return context;
};

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const { addNotification } = useNotificationContext();

  const login = useCallback((email: string) => {
    setUser({ id: 1, name: "홍길동", email });
    addNotification("성공적으로 로그인되었습니다", "success");
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, []);

  const userContextValue: UserContextType = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user],
  );

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};
