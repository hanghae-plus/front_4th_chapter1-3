import { createContext, useContext } from "react";
import { IThemeContext } from "../../types/context";

export const ThemeContext = createContext<IThemeContext | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
