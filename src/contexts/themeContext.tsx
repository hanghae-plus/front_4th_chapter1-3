import React, { createContext, useContext, useState } from "react";

// 1. ThemeContextType 정의
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// 2. ThemeContext 생성, 초기값은 undefined
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

// NOTE: Provider는 React Context의 데이터를 제공하는 컴포넌트
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children // Provider 안에 들어가는 자식 컴포넌트들
}) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. ThemeContext를 쉽게 사용하기 위한 커스텀 훅
export const useTheme = () => {
  // NOTE: 현재 ThemeContext의 값을 가져와서 반환
  const context = useContext(ThemeContext);
  // NOTE: ThemeProvider로 감싸지 않은 컴포넌트에서 useTheme을 호출할 때 에러 발생
  if (context === undefined) {
    throw new Error("useTheme는 ThemeProvider 내부에서 사용해야 합니다.");
  }
  return context;
};
