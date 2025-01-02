import { useCallback, useState } from "react";

import { useMemo } from "../@lib";
import { useThemeContext } from "../providers/theme-provider";
import { generateItems } from "../utils";
import Header from "./common/header";
import ComplexForm from "./complex-form";
import { ItemList } from "./item-list";
import NotificationSystem from "./notification-system";

const CommonLayout = () => {
  const theme = useThemeContext();
  const memoizedItems = useMemo(() => generateItems(1000), []);
  const [items, setItems] = useState(memoizedItems);
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

export default CommonLayout;
