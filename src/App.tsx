import React, { useState, createContext } from "react";
import { generateItems } from "./utils";
import { ItemList } from "./components/item-list/ItemList";
import { ComplexForm } from "./components/complex-form/ComflexForm";
import { Header } from "./components/header/Header";
import { NotificationSystem } from "./components/notification-system/NotificationSystem";
import { ThemeProvider } from "./contexts/theme-context/ThemeProvider";

// 타입 정의
interface User {
  id: number;
  name: string;
  email: string;
}

interface Notification {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

// AppContext 타입 정의
interface AppContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

// 메인 App 컴포넌트
const App: React.FC = () => {
  const [items, setItems] = useState(generateItems(1000));
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

  const login = (email: string) => {
    setUser({ id: 1, name: "홍길동", email });
    addNotification("성공적으로 로그인되었습니다", "success");
  };

  const logout = () => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  };

  const addNotification = (message: string, type: Notification["type"]) => {
    const newNotification: Notification = {
      id: Date.now(),
      message,
      type,
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  const contextValue: AppContextType = {
    user,
    login,
    logout,
    notifications,
    addNotification,
    removeNotification,
  };

  return (
    <ThemeProvider>
      <AppContext.Provider value={contextValue}>
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
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
