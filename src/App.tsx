import React, { useState } from "react";
import { generateItems } from "./utils";
import { IAppContext, INotificationContext } from "./types/Context";
import { INotification } from "./types/Notification";
import { AppContext } from "./utils/AppContext";
import { Header } from "./components/Header";
import { NotificationSystem } from "./components/NotificationSystem";
import { ComplexForm } from "./components/ComplexForm";
import { ItemList } from "./components/ItemList";
import { UserProvider } from "./@context/userContext";
import { NotiContext } from "./@context/notiContext";

// 메인 App 컴포넌트
const App: React.FC = () => {
  const [theme, setTheme] = useState("light");
  const [items, setItems] = useState(generateItems(1000));
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length)
    ]);
  };

  const addNotification = (message: string, type: INotification["type"]) => {
    const newNotification: INotification = {
      id: Date.now(),
      message,
      type
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const notiContextValue: INotificationContext = {
    notifications,
    addNotification,
    removeNotification
  };

  const contextValue: IAppContext = {
    theme,
    toggleTheme
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div
        className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
      >
        <NotiContext.Provider value={notiContextValue}>
          <UserProvider>
            <Header />
          </UserProvider>
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
        </NotiContext.Provider>
      </div>
    </AppContext.Provider>
  );
};

export default App;
