import { createContext, useContext, useState } from "react";
import { IThemeContext } from "../types/Theme";
import { IContextProps } from "../types/Context";
import { useCallback, useMemo } from "../@lib";

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within an AppProvider");
  }
  return context;
};

// toggleTheme: () => void;
export const ThemeProvider = ({ children }: IContextProps) => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme
    }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
