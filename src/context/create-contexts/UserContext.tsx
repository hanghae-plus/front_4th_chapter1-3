import { User } from "@/types/user.types";
import { createContext } from "react";

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});
