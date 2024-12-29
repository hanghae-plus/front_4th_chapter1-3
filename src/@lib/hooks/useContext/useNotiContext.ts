import { createContext, useContext } from "react";
import { Notification } from "../../components";

export interface NotiContextType {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

export const NotiContext = createContext<NotiContextType | undefined>(
  undefined,
);

export const useNotiContext = () => {
  const context = useContext(NotiContext);
  if (context === undefined) {
    throw new Error("useNotiContext must be used within an NotiProvider");
  }
  return context;
};
