import React from "react";
import { NotificationProvider } from "./@lib/context/notification";
import { ThemeProvider } from "./@lib/context/theme";
import { LoginProvider } from "./@lib/context/login";
import Layout from "./@lib/layout/Layout";
import { ItemList } from "./@lib/components/ItemList";
import { ComplexForm } from "./@lib/components/ComplexForm";

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <LoginProvider>
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
        </LoginProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
