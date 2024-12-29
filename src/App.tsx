import React, { useState } from "react";
import { generateItems } from "./utils";
import { useCallback, useMemo } from "./@lib";
import { User, UserContextType } from "./types/userContext";
import { UserContext } from "./context/userContext.tsx";
import { ItemList } from "./components/ItemList.tsx";
import { Header } from "./components/Header.tsx";
import { ThemeContext } from "./context/themeContext.tsx";
import { NotificationContext } from "./context/notificationContext.tsx";
import { ComplexForm } from "./components/ComplexForm.tsx";
import { NotificationSystem } from "./components/NotificationSystem.tsx";
import { NotificationContextType } from "./types/notificationContext";

const App: React.FC = () => {
  const [theme, setTheme] = useState("light");

  const ItemsRender = useMemo(() => generateItems(1000), []);
  const [items, setItems] = useState(ItemsRender);

  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  const login = useCallback((email: string) => {
    setUser({ id: 1, name: "홍길동", email });
    addNotification("성공적으로 로그인되었습니다", "success");
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, []);

  const addNotification = useCallback(
    (message: string, type: Notification["type"]) => {
      const newNotification: Notification = {
        id: Date.now(),
        message,
        type,
      };
      setNotifications((prev) => [...prev, newNotification]);
    },
    [],
  );

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }, []);

  const userValue: UserContextType = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout],
  );

  const notificationValue: NotificationContextType = useMemo(
    () => ({ notifications, addNotification, removeNotification }),
    [notifications],
  );

  const themeValue: ThemeContextType = useMemo(
    () => ({ theme, toggleTheme }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={themeValue}>
      <UserContext.Provider value={userValue}>
        <NotificationContext.Provider value={notificationValue}>
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
        </NotificationContext.Provider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
};
export default App;
