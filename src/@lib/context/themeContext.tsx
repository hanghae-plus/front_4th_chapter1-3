import { useContext, createContext } from "react";
import { ThemeContextType } from "../components/type";

export const themeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const useThemeContext = () => {
  const context = useContext(themeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a themeContext");
  }
  return context;
};
