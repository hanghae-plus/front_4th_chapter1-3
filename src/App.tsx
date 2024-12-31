import React, { useCallback, useState } from "react";
import ComplexForm from "./components/ComplexForm";
import Header from "./components/Header";
import ItemList from "./components/ItemList";
import NotificationSystem from "./components/NotificationSystem";
import NotificationProvider from "./contexts/notification/NotificationProvider";
import ThemeProvider from "./contexts/theme/ThemeProvider";
import UserProvider from "./contexts/user/UserProvider";
import { generateItems } from "./utils";

const App: React.FC = () => {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = useCallback(() => {
    setItems(generateItems(1000));
  }, []);

  return (
    <ThemeProvider>
      <UserProvider>
        <NotificationProvider>
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
        </NotificationProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
