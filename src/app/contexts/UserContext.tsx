import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useNotificationContext } from "./NotificationContext";
import { useCallback, useMemo } from "../../@lib";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
}

interface UserActions {
  login: (email: string, password: string) => void;
  logout: () => void;
}

type UserType = UserState & UserActions;

const UserContext = createContext<UserType | undefined>(undefined);

const UserProvider = ({ children }: PropsWithChildren) => {
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

  const contextValue = useMemo<UserType>(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within an UserProvider");
  }
  return context;
};

export { UserProvider, useUserContext };
