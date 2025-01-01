import { User } from "../../features/user/entity";
import { Notification } from "../../features/notification/entity";

export interface AuthContextType {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}
