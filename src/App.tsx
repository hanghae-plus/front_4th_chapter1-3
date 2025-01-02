import React, { useState } from "react";
import { generateItems } from "./utils";
import { AppContext, AppContextType } from "./contexts/app";
import { Header } from "./components/Header";
import { ItemList } from "./components/ItemList";
import { ComplexForm } from "./components/ComplexForm";
import { NotificationSystem } from "./components/NotificationSystem";
import { useCallback, useMemo } from "./@lib";
import { NotificationProvider } from "./contexts/NotificationContext";
import { UserProvider } from "./contexts/UserContext";

const App: React.FC = () => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const memorizedItem = useMemo(() => generateItems(1000), []);
  const [items, setItems] = useState(memorizedItem);

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  const contextValue: AppContextType = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme],
  );

  return (
    <AppContext.Provider value={contextValue}>
      <div
        className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
      >
        <NotificationProvider>
          <UserProvider>
            <Header />
          </UserProvider>
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 md:pr-4">
                <ItemList items={items} onAddItemsClick={addItems} />
                {/* ItemList는 메모된 items, addItems가 있기 때문에 provider로 인해 리렌더링 트리거되어도 리렌더링 안되는거 */}
              </div>
              <div className="w-full md:w-1/2 md:pl-4">
                <ComplexForm />
              </div>
            </div>
          </div>
          <NotificationSystem />
        </NotificationProvider>
      </div>
    </AppContext.Provider>
  );
};

export default App;
