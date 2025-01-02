import { useCallback, useMemo } from "@lib/hooks";
import { PropsWithChildren, useState } from "react";
import {
  ThemeAction,
  ThemeActionContext,
  ThemeState,
  ThemeStateContext,
} from "./ThemeContext";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const themeState = useMemo<ThemeState>(
    () => ({
      theme,
    }),
    [theme],
  );

  const themeAction = useMemo<ThemeAction>(
    () => ({
      toggleTheme,
    }),
    [toggleTheme],
  );

  return (
    <ThemeActionContext.Provider value={themeAction}>
      <ThemeStateContext.Provider value={themeState}>
        {children}
      </ThemeStateContext.Provider>
    </ThemeActionContext.Provider>
  );
};
