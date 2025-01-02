import React from "react";

import {
  ComplexForm,
  ItemList,
  Header,
  NotificationSystem,
  Layout,
} from "@components";
import { ThemeProvider, NotificationProvider, AuthProvider } from "@contexts";

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
