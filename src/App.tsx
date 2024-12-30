import React, { useState } from "react";
import { generateItems } from "./utils";
import { ItemList } from "./components/item-list/ItemList";
import { ComplexForm } from "./components/complex-form/ComflexForm";
import { Header } from "./components/header/Header";
import { NotificationSystem } from "./components/notification-system/NotificationSystem";
import { ThemeProvider } from "./contexts/theme-context/ThemeProvider";
import AppLayout from "./components/layout/app-layout/AppLayout";
import { UserProvider } from "./contexts/user-context/UserProvider";
import { NotificationProvider } from "./contexts/notification-context/NotificationProvider";

const DEFAULT_ITEM_LENGTH = 1000;

const App: React.FC = () => {
  const [items, setItems] = useState(generateItems(DEFAULT_ITEM_LENGTH));

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(DEFAULT_ITEM_LENGTH, prevItems.length),
    ]);
  };

  return (
    <ThemeProvider>
      <NotificationProvider>
        <UserProvider>
          <AppLayout>
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
          </AppLayout>
        </UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
