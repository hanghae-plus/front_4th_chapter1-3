/* eslint-disable prettier/prettier */
import { useContext } from "react";
import { ThemeContext, ThemeContextType } from "../store/ThemeContext";

export const useThemeContext = (): ThemeContextType => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw Error(
      "useThemeContext 는 ThemeProvider 내부에서만 사용되어야 합니다."
    );
  }

  return themeContext;
};
