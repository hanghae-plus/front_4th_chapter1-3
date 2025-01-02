import { createContext, PropsWithChildren, useContext, useState } from "react";

interface ThemeContextType {
  theme: string | undefined;
}

const ThemeContext = createContext<ThemeContextType["theme"]>(undefined);
const ThemeUpdateContext = createContext(() => {});

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within an ThemeProvider");
  }
  return context;
};

export const useUpdateThemeContext = () => {
  const context = useContext(ThemeUpdateContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within an ThemeProvider");
  }
  return context;
};
