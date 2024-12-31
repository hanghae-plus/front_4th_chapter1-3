import { createContextHook } from "../../utils/function/createContextHook";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const [ThemeContext, useThemeContext] =
  createContextHook<ThemeContextType>("Theme");
