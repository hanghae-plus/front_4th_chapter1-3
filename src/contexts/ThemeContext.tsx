import { PropsWithChildren, useContext, createContext, useState } from "react";
import { useCallback, useMemo } from "../@lib";

type Theme = "light" | "dark";

// Context 타입 분리
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Context 생성
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 커스텀 Hook으로 Context 에러 처리
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
