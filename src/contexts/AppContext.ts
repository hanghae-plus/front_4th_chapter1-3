import { createContext } from "react";
import { User } from "../types/User";
import { Notification } from "../types/Notification";

export interface AppContextType {
  theme: string;
  toggleTheme: () => void;
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
