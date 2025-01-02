import { useContext, createContext } from "react";
import { userContextType } from "../components/type";

export const UserContext = createContext<userContextType | undefined>(
  undefined
);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a userContext");
  }
  return context;
};
