import React from "react";

import { ComplexForm } from "./components/complexForm";
import { ItemList } from "./components/ItemList";
import { Header } from "./components/header";
import { NotificationSystem } from "./components/notificationSystem";
import { ThemeProvider } from "./contexts/theme";
import { NotificationProvider } from "./contexts/notification/NotificationProvider";
import { AuthProvider } from "./contexts/auth";
import { Layout } from "./components/layout";

// ThemeProvider 내부에서 사용할 컴포넌트를 분리
const AppContent: React.FC = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </NotificationProvider>
  );
};

export default App;
