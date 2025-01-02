import { User } from "@/types";
import { createContext } from "react";

interface UserState {
  user: User | null;
}

interface UserAction {
  login: (email: string, password: string) => void;
  logout: () => void;
}

export type UserContextType = UserState & UserAction;

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);
