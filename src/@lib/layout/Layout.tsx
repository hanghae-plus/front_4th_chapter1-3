import { Header } from "../components/Header";
import { NotificationSystem } from "../components/NotificationSystem";
import { useThemeContext } from "../hooks/useThemeContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeContext();

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      <Header />
      {children}
      <NotificationSystem />
    </div>
  );
};

export default Layout;
