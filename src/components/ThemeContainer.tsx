import { useTheme } from "../context/themeContext";

interface ThemeContainerProps {
  children: React.ReactNode;
}

export const ThemeContainer: React.FC<ThemeContainerProps> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      {children}
    </div>
  );
};
