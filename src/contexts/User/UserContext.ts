import { createContext } from "react";
import { User } from "../../types";

export interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);
