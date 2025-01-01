import React, { useState } from "react";
import {
  ComplexForm,
  Header,
  ItemList,
  NotificationSystem,
  AppLayout
} from "./components";
import { ThemeProvider, AuthProvider, NotificationProvider } from "./contexts";
import { generateItems } from "./utils";

// 메인 App 컴포넌트
const App: React.FC = () => {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length)
    ]);
  };

  return (
    <AuthProvider>
      <NotificationProvider>
        <ThemeProvider>
          <AppLayout>
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
          </AppLayout>
        </ThemeProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
