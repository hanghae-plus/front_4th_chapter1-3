import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useCallback, useMemo } from "../hooks";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return (
    <ThemeContext.Provider value={value}>
      <div
        className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within an ThemeProvider");
  }
  return context;
};
