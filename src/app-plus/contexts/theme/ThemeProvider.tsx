import { useRef } from "@lib/hooks";
import { PropsWithChildren } from "react";
import { ThemeContext, themeStore, ThemeStore } from "./ThemeContext";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const store = useRef<ThemeStore | null>(null);

  if (store.current === null) {
    store.current = themeStore;
  }

  return (
    <ThemeContext.Provider value={store.current}>
      {children}
    </ThemeContext.Provider>
  );
};
