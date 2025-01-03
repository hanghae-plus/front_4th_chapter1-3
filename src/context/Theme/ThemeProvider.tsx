import { useState } from "react";
import { ThemeContextType } from "./types";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const CurrentTheme = theme === "light" ? "dark" : "light";
    setTheme(CurrentTheme);
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
