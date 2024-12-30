import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useCallback, useMemo } from "../../@lib";

interface ThemeState {
  theme: string;
}

interface ThemeActions {
  toggleTheme: () => void;
}

type ThemeType = ThemeState & ThemeActions;

const ThemeContext = createContext<ThemeType | undefined>(undefined);

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const contextValue = useMemo<ThemeType>(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within an ThemeProvider");
  }
  return context;
};

const ThemeConsumer = ThemeContext.Consumer;
export { ThemeConsumer, ThemeProvider, useThemeContext };
