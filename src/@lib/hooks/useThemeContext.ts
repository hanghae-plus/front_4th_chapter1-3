import { useContext } from "react";
import { ThemeContext } from "../context/theme";

// 테마 관련 커스텀 훅
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
