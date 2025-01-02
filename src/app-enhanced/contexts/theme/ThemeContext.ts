import { createContext } from "react";

export interface ThemeState {
  theme: string;
}

export interface ThemeAction {
  toggleTheme: () => void;
}

export const ThemeStateContext = createContext<ThemeState | undefined>(
  undefined,
);

export const ThemeActionContext = createContext<ThemeAction | undefined>(
  undefined,
);
