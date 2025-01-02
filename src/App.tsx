import React from "react";
import CommonLayout from "./components/layout";
import { AuthProvider } from "./providers/auth-provider";
import { NotificationProvider } from "./providers/notification-provider";
import { ThemeProvider } from "./providers/theme-provider";

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <ThemeProvider>
          <CommonLayout />
        </ThemeProvider>
      </AuthProvider>
    </NotificationProvider>
  );
};

export default App;
