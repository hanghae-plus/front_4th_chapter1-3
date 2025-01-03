import React from "react";
import { useThemeContext } from "./ThemeContext";

const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useThemeContext();
  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      {children}
    </div>
  );
};

export default Body;
