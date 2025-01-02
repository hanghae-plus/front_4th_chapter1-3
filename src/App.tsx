import React, { useState } from "react";
import { generateItems } from "./utils";
import ThemeContextProvider from "./contexts/ThemeContext";
import UserContextProvider from "./contexts/UserContext";
import NotificationContextProvider from "./contexts/NotificationContext";
import { Header } from "./components/Header";
import { ItemList } from "./components";
import { ComplexForm } from "./components";
import { NotificationSystem } from "./components";

// 메인 App 컴포넌트
const App: React.FC = () => {
  const [theme, setTheme] = useState("light");
  const [items, setItems] = useState(generateItems(10));

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
          <Header />
          <div
            className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
          >
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
          </div>
          <NotificationSystem />
        </UserContextProvider>
      </NotificationContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
