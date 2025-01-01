/* eslint-disable react-refresh/only-export-components */
import { useMemo, useState } from "react";
import { Theme } from "./ThemeProvider.types";
import { createSafeContext } from "../@lib/utils";

interface Props {
  children: React.ReactNode;
}

function ThemeProvider({ children }: Props) {
  const [state, setState] = useState<ContextState>({
    theme: "light",
  });

  const actions = useMemo<ContextActions>(
    () => ({
      toggleTheme() {
        setState(({ theme, ...rest }) => ({
          ...rest,
          theme: theme === "light" ? "dark" : "light",
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
interface ContextState {
  theme: Theme;
}

interface ContextActions {
  toggleTheme(): void;
}

export const [ThemeStateProvider, useThemeStateContext] =
  createSafeContext<ContextState>("ThemeProvider");
export const [ThemeActionsProvider, useThemeActionsContext] =
  createSafeContext<ContextActions>("ThemeProvider");

export default ThemeProvider;
