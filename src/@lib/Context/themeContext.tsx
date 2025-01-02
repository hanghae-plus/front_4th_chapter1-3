import { createContext, useContext, useState } from "react";
import { useCallback } from "../hooks/useCallback";
import { useMemo } from "../hooks";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within an ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const toggleTheme = useCallback(
    () => setTheme((prev) => (prev === "light" ? "dark" : "light")),
    [],
  );
  // provider에 객체를 전달할 경우 새로운 객체를 전달하여 리렌더링이 발생할 수 있음
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <div
        className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
