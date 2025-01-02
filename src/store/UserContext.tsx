/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { createContext, ReactNode, useState } from "react";
import { memo, useCallback, useMemo } from "../@lib";

interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userState, setUserState] = useState<User | null>(null);

  const login = (email: string, _: string) => {
    setUserState({ id: 1, name: "홍길동", email });
  };

  const logout = () => {
    setUserState(null);
  };

  const value: UserContextType = {
    user: userState,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default memo(UserProvider);
