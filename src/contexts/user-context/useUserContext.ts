import { createContext, useContext } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
}

interface userContextType {
  user: User | null;
  actions: {
    login: (user: User) => void;
    logout: () => void;
  };
}

export const UserContext = createContext<userContextType | undefined>(
  undefined,
);

export const useGetUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useGetUser must be used within an AppProvider");
  }
  return context.user;
};

export const useGetUserActions = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useGetUserActions must be used within an AppProvider");
  }
  return context.actions;
};
