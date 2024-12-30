import { PropsWithChildren } from "react";
import { useThemeStore } from "../contexts";

export const MainLayout = ({ children }: PropsWithChildren) => {
  const theme = useThemeStore((state) => state.theme);
  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      {children}
    </div>
  );
};
