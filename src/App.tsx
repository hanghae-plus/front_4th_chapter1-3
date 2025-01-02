import React from "react";
import { ItemList } from "./components/ItemList";
import { ComplexForm } from "./components/ComplexForm";
import { NotificationSystem } from "./components/NotificationSystem";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { NotificationContextProvider } from "./contexts/NotificationContext";
import { UserContextProvider } from "./contexts/UserContext";
import { Layout } from "./components/Layout";

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <ThemeContextProvider>
      <NotificationContextProvider>
        <UserContextProvider>
          <Layout>
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
          </Layout>
          <NotificationSystem />
        </UserContextProvider>
      </NotificationContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
