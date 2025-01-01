import { createContext, useContext } from "react";

interface ThemeContextType {
  theme: string;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeActionsType {
  toggleTheme: () => void;
}

export const ThemeActionsContext = createContext<ThemeActionsType | undefined>(
  undefined,
);
export const useThemeActions = () => {
  const context = useContext(ThemeActionsContext);
  if (context === undefined) {
    throw new Error("useThemeActions must be used within a ThemeProvider");
  }
  return context;
};
