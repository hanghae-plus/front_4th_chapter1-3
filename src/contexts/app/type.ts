import { Notification } from "../../features/notification/entity";
import { Item } from "../../features/product/entity";

export interface AppContextType {
  theme: string;
  toggleTheme: () => void;
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
  items: Item[];
  addItems: () => void;
}
