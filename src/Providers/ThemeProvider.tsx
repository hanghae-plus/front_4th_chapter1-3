import { useState } from "react";
import { useCallback, useMemo } from "../@lib";
import { ThemeActionsContext, ThemeContext } from "../hooks/useThemeContext";

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

  const value = useMemo(() => ({ theme }), [theme]);
  const actions = useMemo(() => ({ toggleTheme }), [toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <ThemeActionsContext.Provider value={actions}>
        {children}
      </ThemeActionsContext.Provider>
    </ThemeContext.Provider>
  );
};
