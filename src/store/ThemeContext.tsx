/* eslint-disable react-refresh/only-export-components */

import { createContext, ReactNode, useState } from "react";
import { memo } from "../@lib";

type ThemeType = "dark" | "light";

export interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeState, setThemeState] = useState<ThemeType>("light");

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value: ThemeContextType = {
    theme: themeState,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default memo(ThemeProvider);
