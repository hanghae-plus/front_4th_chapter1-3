import { PropsWithChildren } from "react";
import { useGetTheme } from "../../../contexts/theme-context/useThemeContext";

const AppLayout = ({ children }: PropsWithChildren) => {
  const theme = useGetTheme();

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      {children}
    </div>
  );
};

export default AppLayout;
