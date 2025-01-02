import React, { useState } from "react";
import { UserProvider, ThemeProvider, NotificationProvider } from "./contexts";
import { generateItems } from "./utils";
import { ItemList } from "./components/ItemList";
import { ComplexForm } from "./components/ComplexForm";
import { BaseLayout } from "./components/BaseLayout";
import { useCallback } from "./@lib";
import { Header } from "./components/Header";
import { NotificationSystem } from "./components/NotificationSystem";

const App: React.FC = () => {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  return (
    <ThemeProvider>
      <NotificationProvider>
        <UserProvider>
          <Header />

          <BaseLayout>
            <div className="w-full md:w-1/2 md:pr-4">
              <ItemList items={items} onAddItemsClick={addItems} />
            </div>
            <div className="w-full md:w-1/2 md:pl-4">
              <ComplexForm />
            </div>
            <NotificationSystem />
          </BaseLayout>
        </UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
