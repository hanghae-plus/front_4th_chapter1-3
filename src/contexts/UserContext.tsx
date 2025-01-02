import { createContext, useContext, useState } from "react";
import { useCallback, useMemo } from "../@lib";
import { User, UserContextType } from "../types";
import { NotificationContext } from "./NotificationContext";

const InitUserData = { id: 0, name: "", email: "" };
const UserData = {
  user: InitUserData,
  login: (email: string, password: string) => {
    console.warn(email, password, "error");
  },
  logout: () => {
    console.warn("error");
  },
};

export const UserContext = createContext<UserContextType>(UserData);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(InitUserData);
  const { addNotification } = useContext(NotificationContext);

  const login = useCallback(
    (email: string) => {
      setUser({ id: 1, name: "홍길동", email });
      addNotification("성공적으로 로그인되었습니다", "success");
    },
    [addNotification],
  );

  const logout = useCallback(() => {
    setUser(InitUserData);
    addNotification("로그아웃되었습니다", "info");
  }, [addNotification]);

  const userValue = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user],
  );

  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
};
