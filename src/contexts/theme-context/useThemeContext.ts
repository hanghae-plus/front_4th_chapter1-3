import { createContext, useContext } from "react";

export type ThemeType = "light" | "dark";

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const useGetThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useGetThemeContext must be used within an AppProvider");
  }
  return context.theme;
};

export const useGetToggleTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useGetToggleTheme must be used within an AppProvider");
  }
  return context.toggleTheme;
};
