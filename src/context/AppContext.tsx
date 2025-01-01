import { createContext, useContext, useState } from "react";
import { generateItems } from "../utils";
import { Item, Notification, User } from "../types";

interface AppContextType {
  theme: string;
  toggleTheme: () => void;
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
  items: Item[];
  addItems: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// 감싸는 객체는 ContextProvider라는 이름으로 생성하는 것을 추천
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState("light");
  const [items, setItems] = useState(generateItems(1000));
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

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
    theme,
    toggleTheme,
    user,
    login,
    logout,
    notifications,
    addNotification,
    removeNotification,
    addItems,
    items,
  };

  return (
    // 실제로 return하는 부분은 AppContext의 Provider를 감싼다
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>

    /**
     * AppContextProvider를 실제 사용할 때는 아래와 같이 사용
     *
     * <AppContextProvider>
     *  <App />
     * </AppcontextProvider>
     */
  );
};
