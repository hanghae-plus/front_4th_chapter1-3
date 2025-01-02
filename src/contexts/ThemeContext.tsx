import React, { createContext, useMemo, useState } from "react";
import { useCallback } from "../@lib";
import { ThemeType } from "../types";

export const ThemeContext = createContext<ThemeType>({
  theme: "light",
  toggleTheme: () => {
    console.warn("No toggleTheme found.");
  },
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const themeValue = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
};
