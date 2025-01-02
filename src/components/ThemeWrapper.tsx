import { PropsWithChildren } from "react";
import { useThemeContext } from "../contexts/theme/useThemeContext";

const ThemeWrapper = ({ children }: PropsWithChildren) => {
  const { theme } = useThemeContext();

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      {children}
    </div>
  );
};

export default ThemeWrapper;
