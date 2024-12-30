import { createContext, PropsWithChildren, useContext } from "react";
import { useRef, useStore } from "../../@lib";
import { createStore, Store } from "../../storeUtils";

interface ThemeState {
  theme: string;
}

interface ThemeActions {
  toggleTheme: () => void;
}

type ThemeType = ThemeState & ThemeActions;
type ThemeStore = Store<ThemeType>;

const themeStore: ThemeStore = createStore<ThemeType>((set) => ({
  theme: "light",
  toggleTheme: () => {
    set((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }));
  },
}));

const ThemeContext = createContext<ThemeStore | undefined>(undefined);

const ThemeProvider = ({ children }: PropsWithChildren) => {
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

const useThemeStore = <S,>(selector: (context: ThemeType) => S) => {
  const store = useContext(ThemeContext);
  if (store === undefined) {
    throw new Error("useThemeContext must be used within an ThemeProvider");
  }
  return useStore(store, selector);
};

export { ThemeProvider, useThemeStore };
