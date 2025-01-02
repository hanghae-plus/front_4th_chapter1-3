import React, { PropsWithChildren } from "react";
import { useTheme } from "../contexts";

export const BaseLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">{children}</div>
      </div>
    </div>
  );
};
