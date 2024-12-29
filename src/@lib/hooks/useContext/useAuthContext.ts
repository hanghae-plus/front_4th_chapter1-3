import { createContext, useContext } from "react";
import { User } from "../../components";

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an NotiProvider");
  }
  return context;
};
