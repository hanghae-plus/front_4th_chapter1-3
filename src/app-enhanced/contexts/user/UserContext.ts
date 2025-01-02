import { User } from "@/types";
import { createContext } from "react";

export interface UserState {
  user: User | null;
}

export interface UserAction {
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const UserStateContext = createContext<UserState | undefined>(undefined);
export const UserActionContext = createContext<UserAction | undefined>(
  undefined,
);
