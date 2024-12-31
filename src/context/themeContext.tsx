import { createContext, useContext } from "react";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      "useThemeContext must be used within a ThemeContext.Provider",
    );
  }
  return context;
};
