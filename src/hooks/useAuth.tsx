import { createContext, useContext } from "react";
import { AuthContextType } from "../Interface";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AppProvider");
  }
  return context;
};
