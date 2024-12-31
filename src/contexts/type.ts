import { User } from "../features/user/entity";
import { Notification } from "../features/notification/entity";
import { Item } from "../features/product/entity";

export interface AppContextType {
  theme: string;
  toggleTheme: () => void;
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
  items: Item[];
  addItems: () => void;
}
