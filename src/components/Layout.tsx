import { useContext } from "react";
import { Header } from "./Header";
import { ThemeContext } from "../contexts";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme = useContext(ThemeContext).theme;

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      <Header />
      {children}
    </div>
  );
};
