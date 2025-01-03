import React from "react";
import {
  ComplexForm,
  Header,
  ItemList,
  NotificationSystem,
} from "./components";
import ItemListContainer from "./components/ItemListContainer";
import { AppProvider } from "./context/App/AppProvider";
import { ThemeProvider } from "./context/Theme/ThemeProvider";
import { AuthProvider } from "./context/Auth/AuthProvider";
import { ItemProvider } from "./context/Item/ItemProvider";

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <AppProvider>
      <ThemeProvider>
        <AuthProvider>
          <ItemProvider>
            <div className="min-h-screen">
              <Header />
              <ItemListContainer>
                <div className="w-full md:w-1/2 md:pr-4">
                  <ItemList />
                </div>
                <div className="w-full md:w-1/2 md:pl-4">
                  <ComplexForm />
                </div>
              </ItemListContainer>
              <NotificationSystem />
            </div>
          </ItemProvider>
        </AuthProvider>
      </ThemeProvider>
    </AppProvider>
  );
};

export default App;
