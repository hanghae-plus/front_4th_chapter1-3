import { createStore, Store } from "@/storeUtils";
import { createContext } from "react";

interface ThemeState {
  theme: string;
}

interface ThemeAction {
  toggleTheme: () => void;
}

export type ThemeType = ThemeState & ThemeAction;
export type ThemeStore = Store<ThemeType>;

export const themeStore: ThemeStore = createStore<ThemeType>((set) => ({
  theme: "light",
  toggleTheme: () => {
    set((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }));
  },
}));

export const ThemeContext = createContext<ThemeStore | undefined>(undefined);
