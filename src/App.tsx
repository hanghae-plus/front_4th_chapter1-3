import React from "react";
import { AuthProvider, NotificationProvider, ThemeProvider } from "./store";
import {
  NotificationSystem,
  ItemList,
  ComplexForm,
  ThemeContainer,
  Header,
} from "./components";

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <ThemeProvider>
        <AuthProvider>
          <ThemeContainer>
            <Header />
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col md:flex-row">
                <ItemList />
                <ComplexForm />
              </div>
            </div>
            <NotificationSystem />
          </ThemeContainer>
        </AuthProvider>
      </ThemeProvider>
    </NotificationProvider>
  );
};

export default App;
