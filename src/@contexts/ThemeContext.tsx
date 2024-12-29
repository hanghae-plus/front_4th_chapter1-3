/* eslint-disable react-refresh/only-export-components */
import { memo, useMemo, useState } from "react";
import { createSafeContext } from "../@lib/utils/createSafeContext";

interface Props {
  children: React.ReactNode;
}

function ThemeProvider({ children }: Props) {
  const [state, setState] = useState<ThemeState>({
    theme: "light",
  });

  const actions = useMemo<ThemeActions>(
    () => ({
      toggleTheme() {
        setState((prev) => ({
          ...prev,
          theme: prev.theme === "light" ? "dark" : "light",
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
export interface ThemeState {
  theme: "dark" | "light";
}

export interface ThemeActions {
  toggleTheme(): void;
}

export const [ThemeStateProvider, useThemeStateContext] =
  createSafeContext<ThemeState>("ThemeProvider");
export const [ThemeActionsProvider, useThemeActionsContext] =
  createSafeContext<ThemeActions>("ThemeProvider");

export default memo(ThemeProvider);
