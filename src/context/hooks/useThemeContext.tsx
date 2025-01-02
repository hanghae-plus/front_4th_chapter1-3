import { useContext } from "react";
import { ThemeContext } from "@/context/create-contexts";

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("Cannot find ThemeContext");
  }
  return context;
};
