import React, { useState, useCallback } from "react";
import {
  Header,
  ItemList,
  ComplexForm,
  NotificationSystem,
} from "./components";
import { Item } from "./types";
import { generateItems } from "./utils";
import { ThemeProvider, UserProvider, NotificationProvider } from "./contexts";

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>(generateItems(1000));

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  return (
    <ThemeProvider>
      <UserProvider>
        <NotificationProvider>
          <MainApp items={items} onAddItemsClick={addItems} />
        </NotificationProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

interface MainAppProps {
  items: Item[];
  onAddItemsClick: () => void;
}

const MainApp: React.FC<MainAppProps> = React.memo(
  ({ items, onAddItemsClick }) => {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 md:pr-4">
              <ItemList items={items} onAddItemsClick={onAddItemsClick} />
            </div>
            <div className="w-full md:w-1/2 md:pl-4">
              <ComplexForm />
            </div>
          </div>
        </div>
        <NotificationSystem />
      </div>
    );
  },
);

export default App;
