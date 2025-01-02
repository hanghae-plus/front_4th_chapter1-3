import React, { createContext, useState, useCallback, ReactNode } from "react";
import { User } from "../types";
import type { UserContextType } from "../types";

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string) => {
    setUser({ id: 1, name: "홍길동", email });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
