/* eslint-disable react-refresh/only-export-components */
import { useMemo, useState } from "react";
import { createSafeContext } from "../@lib/utils/createSafeContext";
import { ThemeMode } from "./ThemeContext.types";

interface Props {
  children: React.ReactNode;
}

function ThemeProvider({ children }: Props) {
  const [state, setState] = useState<ThemeContextState>({
    mode: "light",
  });

  const actions = useMemo<ThemeContextActions>(
    () => ({
      toggleThemeMode() {
        setState(({ mode, ...rest }) => ({
          ...rest,
          mode: mode === "light" ? "dark" : "light",
        }));
      },
    }),
    [],
  );

  return (
    <ThemeStateProvider {...state}>
      <ThemeActionsProvider {...actions}>{children}</ThemeActionsProvider>
    </ThemeStateProvider>
  );
}

// Context API
export interface ThemeContextState {
  mode: ThemeMode;
}

export interface ThemeContextActions {
  toggleThemeMode(): void;
}

export const [ThemeStateProvider, useThemeStateContext] =
  createSafeContext<ThemeContextState>("ThemeProvider");
export const [ThemeActionsProvider, useThemeActionsContext] =
  createSafeContext<ThemeContextActions>("ThemeProvider");

export default ThemeProvider;
