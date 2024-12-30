// 타입 정의
import { createContext, useContext } from "react";
import {
  NotificationContextType,
  ThemeContextType,
  UserContextType,
} from "../types/types.ts";

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);
export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
