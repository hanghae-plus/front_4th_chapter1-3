import { createContext, useContext } from "react";
import { UserContextType } from "../types/userContext";

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUserContext must be used within a UserContext.Provider",
    );
  }
  return context;
};
