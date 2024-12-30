import { PropsWithChildren, useCallback, useState } from "react";
import { useMemo } from "../../@lib";
import { ThemeContext, ThemeType } from "./useThemeContext";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<ThemeType>("light");

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const contextValue = useMemo(() => {
    return {
      toggleTheme,
      theme,
    };
  }, [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
