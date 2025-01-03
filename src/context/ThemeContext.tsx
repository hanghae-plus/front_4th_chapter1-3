import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

// 1. type
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

interface PropsWithChildren {
  children: React.ReactNode;
}

// 2. context
const ThemeContext = createContext<ThemeContextType | null>(null);

// 3. provider
export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// 4. hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
