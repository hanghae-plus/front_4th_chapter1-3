import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }

  return context;
}
