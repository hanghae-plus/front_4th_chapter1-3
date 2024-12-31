import React, { useState, createContext, useContext, PropsWithChildren } from "react";
import { useCallback, useMemo, memo } from "./@lib"
import { generateItems, renderLog } from "./utils";

// 타입 정의
type Theme = 'light' | 'dark';

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

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: Notification["type"]) => void;
  removeNotification: (id: number) => void;
}

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

interface UserContextType {
  user: User | null;
  login: (email: string, name: string) => void;
  logout: () => void;
}

// 커스텀 훅: useAppContext
const ThemeContext = createContext<ThemeContextType | null>(null);
const UserContext = createContext<UserContextType | null>(null);
const NotificationContext = createContext<NotificationContextType | null>(null);

// Provider 컴포넌트
const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // 다크모드 관련
  const [theme, setTheme] = useState<Theme>('light'); 
  
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }, [])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
};

const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { addNotification } = useNotification();

  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string, name: string) => {
    setUser({ id: 1, name, email });
    addNotification("성공적으로 로그인되었습니다", "success");
  }, [])

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

const NotificationProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((message: string, type: Notification["type"]) => {
    setNotifications(prevNotify => [...prevNotify, { id: Date.now(), message, type }]);
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  const value = useMemo(() => ({
    notifications, addNotification, removeNotification
  }), [notifications, addNotification, removeNotification]);

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

// Custom 훅
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};

const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used within a NotificationProvider');
  return context;
};

// Header 컴포넌트
export const Header: React.FC = () => {
  renderLog("Header rendered");
  const { theme, toggleTheme } = useTheme();
  const { user, logout, login } = useUser();

  const handleLogin = () => {
    // 실제 애플리케이션에서는 사용자 입력을 받아야 합니다.
    login("user@example.com", "홍길동")
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={`p-4 ${theme === 'light' ? 'bg-gray-800 text-white' : 'bg-gray-800 text-gray-200'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">샘플 애플리케이션</h1>
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            {theme === "light" ? "다크 모드" : "라이트 모드"}
          </button>
          {user ? (
            <div className="flex items-center">
              <span className="mr-2">{user.name}님 환영합니다!</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

// ItemList 컴포넌트
export const ItemList: React.FC = memo(() => {
  renderLog("ItemList rendered");
  const memoizedItems = useMemo(() => generateItems(1000), []);
  const [items, setItems] = useState(memoizedItems);
  const [filter, setFilter] = useState("");
  const { theme } = useTheme();

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      item.category.toLowerCase().includes(filter.toLowerCase()),
  );

  const totalPrice = filteredItems.reduce((sum, item) => sum + item.price, 0);

  const averagePrice = Math.round(totalPrice / filteredItems.length) || 0;

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">상품 목록</h2>
        <div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs"
            onClick={addItems}
          >
            대량추가
          </button>
        </div>
      </div>
      <input
        type="text"
        placeholder="상품 검색..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
      />
      <ul className="mb-4 mx-4 flex gap-3 text-sm justify-end">
        <li>검색결과: {filteredItems.length.toLocaleString()}개</li>
        <li>전체가격: {totalPrice.toLocaleString()}원</li>
        <li>평균가격: {averagePrice.toLocaleString()}원</li>
      </ul>
      <ul className="space-y-2">
        {filteredItems.map((item, index) => (
          <li
            key={index}
            className={`p-2 rounded shadow ${theme === "light" ? "bg-white text-black" : "bg-gray-700 text-white"}`}
          >
            {item.name} - {item.category} - {item.price.toLocaleString()}원
          </li>
        ))}
      </ul>
    </div>
  );
});

// ComplexForm 컴포넌트
export const ComplexForm: React.FC = memo(() => {
  renderLog("ComplexForm rendered");
  const { addNotification } = useNotification();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: 0,
    preferences: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification("폼이 성공적으로 제출되었습니다", "success");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? parseInt(value) || 0 : value,
    }));
  };

  const handlePreferenceChange = (preference: string) => {
    setFormData((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter((p) => p !== preference)
        : [...prev.preferences, preference],
    }));
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">복잡한 폼</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="이름"
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="이메일"
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          placeholder="나이"
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <div className="space-x-4">
          {["독서", "운동", "음악", "여행"].map((pref) => (
            <label key={pref} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formData.preferences.includes(pref)}
                onChange={() => handlePreferenceChange(pref)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2">{pref}</span>
            </label>
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          제출
        </button>
      </form>
    </div>
  );
});

// NotificationSystem 컴포넌트
export const NotificationSystem: React.FC = memo(() => {
  renderLog("NotificationSystem rendered");
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded shadow-lg ${
            notification.type === "success"
              ? "bg-green-500"
              : notification.type === "error"
                ? "bg-red-500"
                : notification.type === "warning"
                  ? "bg-yellow-500"
                  : "bg-blue-500"
          } text-white`}
        >
          {notification.message}
          <button
            onClick={() => removeNotification(notification.id)}
            className="ml-4 text-white hover:text-gray-200"
          >
            닫기
          </button>
        </div>
      ))}
    </div>
  );
});

const Application: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pr-4">
            <ItemList />
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <ComplexForm />
          </div>
        </div>
      </div>
      <NotificationSystem />
    </div>
  );
};

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <UserProvider>
          <Application />
        </UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  )
}

export default App;