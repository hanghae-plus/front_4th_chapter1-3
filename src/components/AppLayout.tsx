import { AppLayoutProps } from "../@lib/types";
import React from "react";
import { memo } from "../@lib";
import { Header } from "./Header.tsx";
import { ComplexForm } from "./ComplexForm.tsx";
import { NotificationSystem } from "./NotificationSystem.tsx";
import { ItemList } from "./ItemList_v2.tsx";

export const AppLayout: React.FC<AppLayoutProps> = memo(({ theme }) => {
  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pl-4">
            <ComplexForm />
          </div>
          <div className="w-full md:w-1/2 md:pr-4">
            <ItemList />
          </div>
        </div>
      </div>
      <NotificationSystem />
    </div>
  );
});
