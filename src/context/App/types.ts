import { Notification } from "../../types";

// AppContext 타입 정의
export interface AppContextType {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}
