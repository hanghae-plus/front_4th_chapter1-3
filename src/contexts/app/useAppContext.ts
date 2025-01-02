import { useContext } from "react";
import { AppContext } from "./AppContext";

export function useAppContext() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }

  return context;
}
