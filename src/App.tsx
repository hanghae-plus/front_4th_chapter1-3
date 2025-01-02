import React, { useState } from "react";
import { ItemList } from "./components/ItemList";
import { ComplexForm } from "./components/ComplexForm";
import { NotificationSystem } from "./components/NotificationSystem";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { NotificationContextProvider } from "./contexts/NotificationContext";
import { UserContextProvider } from "./contexts/UserContext";
import { Layout } from "./components/Layout";
import { generateItems } from "./utils";

// 메인 App 컴포넌트
const App: React.FC = () => {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

  return (
    <ThemeContextProvider>
      <NotificationContextProvider>
        <UserContextProvider>
          <Layout>
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
          </Layout>
          <NotificationSystem />
        </UserContextProvider>
      </NotificationContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
