import { useContext } from "react";
import { ThemeContext } from "../store";

const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export default useThemeContext;
