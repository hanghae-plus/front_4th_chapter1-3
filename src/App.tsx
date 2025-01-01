import React from "react";
import { ComplexForm } from "./components/ComplexForm";
import { Header } from "./components/Header";
import { ItemList } from "./components/ItemList";
import { NotificationSystem } from "./components/NotificationSystem";
import { ThemeContainer } from "./components/ThemeContainer";
import { AuthProvider } from "./context/authContext";
import { NotificationProvider } from "./context/notificationContext";
import { ThemeProvider } from "./context/themeContext";

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <ThemeProvider>
          <ThemeContainer>
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
          </ThemeContainer>
        </ThemeProvider>
      </AuthProvider>
    </NotificationProvider>
  );
};

export default App;
