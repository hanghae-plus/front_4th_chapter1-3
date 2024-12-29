import { useState } from "react";
import Header from "./@components/Header";
import ItemList from "./@components/ItemList";
import NotificationProvider from "./@contexts/NotificationContext";
import ThemeProvider, { useThemeStateContext } from "./@contexts/ThemeContext";
import UserProvider from "./@contexts/UserContext";
import { generateItems } from "./utils";
import { usePreservedCallback } from "./@lib/hooks/usePreservedCallback";
import ComplexForm from "./@components/ComplexForm";
import NotificationSystem from "./@components/NotificationSystem";

function App() {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = usePreservedCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  });

  return (
    <UserProvider>
      <ThemeProvider>
        <NotificationProvider>
          <Root>
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
          </Root>
        </NotificationProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

// Subcomponents
interface RootProps {
  children: React.ReactNode;
}

const Root = ({ children }: RootProps) => {
  const { theme } = useThemeStateContext("Root");

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      {children}
    </div>
  );
};

export default App;
