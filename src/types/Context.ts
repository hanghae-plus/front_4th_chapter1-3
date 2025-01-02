import { IUser } from "./User";
import { INotification } from "./Notification";
import { ReactNode } from "react";

export interface IAppContext {
  theme: string;
  toggleTheme: () => void;
}

export interface INotificationContext {
  notifications: INotification[];
  addNotification: (message: string, type: INotification["type"]) => void;
  removeNotification: (id: number) => void;
}

export interface IUserContext {
  user: IUser | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export interface IContextProps {
  children: ReactNode;
}
