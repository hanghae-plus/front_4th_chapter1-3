import { createContext } from "react";

interface ThemeState {
  theme: string;
}

interface ThemeAction {
  toggleTheme: () => void;
}

export type ThemeContextType = ThemeState & ThemeAction;

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
