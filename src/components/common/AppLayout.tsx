import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

// 레이아웃을 위한 새로운 컴포넌트 추가
export const AppLayout = React.memo(
  ({ children }: { children: React.ReactNode }) => {
    const { theme } = useTheme();
    return (
      <div
        className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
      >
        {children}
      </div>
    );
  }
);
