import { useState } from "react";
import { useCallback, useMemo } from "../@lib";
import { ThemeContext } from "../Contexts/ThemeContext";

export const ThemeProvider = ({
  defaultTheme = "light",
  children,
}: {
  defaultTheme?: "light" | "dark";
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState(defaultTheme);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
