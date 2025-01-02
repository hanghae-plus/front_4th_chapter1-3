import { createContext, useContext, useState } from "react";
import { useCallback, useMemo } from "../@lib";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within an ThemeProvider");
  }
  return context;
};

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const themeContextValue: ThemeContextType = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme],
  );
  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
