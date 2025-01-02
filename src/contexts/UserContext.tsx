import React, { createContext, useContext, useState } from "react";
import { IUser } from "../type/type";
import { useCallback, useMemo } from "../@lib";
import { useNotificationActionContext } from "./NotificationContext";

interface UserStateContextType {
  user: IUser | null;
}

interface UserActionContextType {
  login: (email: string, password: string) => void;
  logout: () => void;
}

const UserStateContext = createContext<UserStateContextType | undefined>(
  undefined,
);
const UserActionContext = createContext<UserActionContextType | undefined>(
  undefined,
);

export const useUserStateContext = () => {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error(
      "useUserStateContext must be used within an UserContextProvider",
    );
  }
  return context;
};
export const useUserActionContext = () => {
  const context = useContext(UserActionContext);
  if (context === undefined) {
    throw new Error(
      "useUserActionContext must be used within an UserContextProvider",
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
  const { addNotification } = useNotificationActionContext();

  const login = useCallback((email: string) => {
    setUser({ id: 1, name: "홍길동", email });
    addNotification("성공적으로 로그인되었습니다", "success");
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, []);

  const userStateContextValue: UserStateContextType = useMemo(
    () => ({
      user,
    }),
    [user],
  );

  const userActionContextValue: UserActionContextType = useMemo(
    () => ({
      login,
      logout,
    }),
    [login, logout],
  );

  return (
    <UserActionContext.Provider value={userActionContextValue}>
      <UserStateContext.Provider value={userStateContextValue}>
        {children}
      </UserStateContext.Provider>
    </UserActionContext.Provider>
  );
};
