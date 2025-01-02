import { useState } from "react";
import { generateItems } from "./utils";
import { ItemList } from "./Components/ItemList";
import { NotificationProvider } from "./Providers/NotificationProvider";
import { ThemeProvider } from "./Providers/ThemeProvider";
import { useThemeContext } from "./hooks/useTheme";
import { AuthProvider } from "./Providers/AuthProvider";
import { ComplexForm } from "./Components/ComplexForm";
import { Header } from "./Components/Header";

// 메인 App 컴포넌트
const App: React.FC = () => {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

  const { theme } = useThemeContext();

  return (
    <NotificationProvider>
      <AuthProvider>
        <ThemeProvider>
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
          </div>
        </ThemeProvider>
      </AuthProvider>
    </NotificationProvider>
  );
};

export default App;
