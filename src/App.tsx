import React from "react";
import ComplexForm from "./components/ComplexForm";
import Header from "./components/Header";
import ItemList from "./components/ItemList";
import NotificationSystem from "./components/NotificationSystem";
import ThemeWrapper from "./components/ThemeWrapper";
import NotificationProvider from "./contexts/notification/NotificationProvider";
import ThemeProvider from "./contexts/theme/ThemeProvider";
import UserProvider from "./contexts/user/UserProvider";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <UserProvider>
          <ThemeWrapper>
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
          </ThemeWrapper>
        </UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
