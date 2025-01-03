import { createContext, useContext, useState } from "react";
import { User } from "../types";
import { useNotification } from "./NotificationContext";
import { useMemo } from "../hooks";

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const { addNotification } = useNotification();

  const value = useMemo(
    () => ({
      user,
      login: (email: string) => {
        setUser({ id: 1, name: "홍길동", email });
        addNotification("성공적으로 로그인되었습니다", "success");
      },
      logout: () => {
        setUser(null);
        addNotification("로그아웃되었습니다", "info");
      },
    }),
    [user, addNotification],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("UserProvider 내에서 사용되어야 합니다.");
  return context;
};
