import { useContext } from "react";
import { AuthContext } from "../store";

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export default useAuthContext;
