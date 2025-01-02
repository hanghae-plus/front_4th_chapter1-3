import React from "react";
import { ThemeProvider } from "./context/theme";
import { UserProvider } from "./context/user";
import { NotificationProvider } from "./context/notification";
import {
  ComplexForm,
  Header,
  ItemList,
  NotificationSystem,
} from "./components";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <UserProvider>
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
        </UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
