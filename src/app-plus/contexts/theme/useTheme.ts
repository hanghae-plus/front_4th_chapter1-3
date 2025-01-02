import { useContext } from "react";
import { ThemeContext, ThemeType } from "./ThemeContext";
import { useStore } from "@lib/hooks";

export const useThemeStore = <S>(selector: (context: ThemeType) => S) => {
  const store = useContext(ThemeContext);
  if (store === undefined) {
    throw new Error("useThemeContext must be used within an ThemeProvider");
  }
  return useStore(store, selector);
};
