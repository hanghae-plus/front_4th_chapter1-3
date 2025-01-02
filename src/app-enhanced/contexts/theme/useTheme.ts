import { useContext } from "react";
import { ThemeActionContext, ThemeStateContext } from "./ThemeContext";

export const useThemeState = () => {
  const context = useContext(ThemeStateContext);
  if (context === undefined) {
    throw new Error("useThemeState must be used within an ThemeProvider");
  }
  return context;
};

export const useThemeAction = () => {
  const context = useContext(ThemeActionContext);
  if (context === undefined) {
    throw new Error("useThemeAction must be used within an ThemeProvider");
  }
  return context;
};
