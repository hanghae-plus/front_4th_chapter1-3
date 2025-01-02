import { useState } from "react";
import { ComplexForm } from "./ComplexForm";
import { ItemList } from "./ItemList";
import { Header } from "./Header";
import { NotificationSystem } from "./NotificationSystem";
import { useThemeState } from "../contexts/theme";
import { generateItems } from "@/utils";
import { useCallback } from "@lib/hooks";

export const MainSection = () => {
  const [items, setItems] = useState(() => generateItems(1000));
  const { theme } = useThemeState();

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pr-4">
            <ItemList items={items} onAddItemsClick={addItems} />
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <ComplexForm />
          </div>
        </div>
      </div>
      <NotificationSystem />
    </div>
  );
};
