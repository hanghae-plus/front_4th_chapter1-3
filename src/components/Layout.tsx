import { useThemeContext } from "../contexts/themeContext";
import { Header } from "./Header";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeContext();

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      <Header />
      {children}
    </div>
  );
};
