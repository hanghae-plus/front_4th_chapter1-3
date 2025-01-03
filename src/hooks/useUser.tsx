import { useContext } from "react";
import { UserContext } from "../contexts";
import type { UserContextType } from "../types";

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
