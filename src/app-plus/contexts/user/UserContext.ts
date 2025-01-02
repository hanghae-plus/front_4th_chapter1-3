import { createStore, Store } from "@/storeUtils";
import { User } from "@/types";
import { createContext } from "react";

interface UserState {
  user: User | null;
}

interface UserAction {
  login: (email: string, password: string) => void;
  logout: () => void;
}

export type UserType = UserState & UserAction;
export type UserStore = Store<UserType>;

export const userStore: UserStore = createStore<UserType>((set) => ({
  user: null,
  login: (email) => {
    set((prev) => {
      return { ...prev, user: { id: 1, name: "홍길동", email } };
    });
  },
  logout: () => {
    set((prev) => {
      return { ...prev, user: null };
    });
  },
}));

export const UserContext = createContext<UserStore | undefined>(undefined);
