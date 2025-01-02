import { createContext, useContext, useState } from "react";
import { useCallback, useMemo } from "../@lib";

interface ThemeStateContextType {
  theme: string;
}

interface ThemeActionContextType {
  toggleTheme: () => void;
}

const ThemeStateContext = createContext<ThemeStateContextType | undefined>(
  undefined,
);

const ThemeActionContext = createContext<ThemeActionContextType | undefined>(
  undefined,
);

export const useThemeStateContext = () => {
  const state = useContext(ThemeStateContext);
  if (state === undefined) {
    throw new Error(
      "useThemeStateContext must be used within an ThemeProvider",
    );
  }
  return state;
};

export const useThemeActionContext = () => {
  const actions = useContext(ThemeActionContext);
  if (actions === undefined) {
    throw new Error(
      "useThemeActionContext must be used within an ThemeProvider",
    );
  }
  return actions;
};

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const themeStateContextValue: ThemeStateContextType = useMemo(
    () => ({
      theme,
    }),
    [theme],
  );
  const themeActionContextValue: ThemeActionContextType = useMemo(
    () => ({
      toggleTheme,
    }),
    [toggleTheme],
  );

  return (
    <ThemeActionContext.Provider value={themeActionContextValue}>
      <ThemeStateContext.Provider value={themeStateContextValue}>
        {children}
      </ThemeStateContext.Provider>
    </ThemeActionContext.Provider>
  );
};
