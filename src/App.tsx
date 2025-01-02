import React from "react";
import ThemeProvider from "./store/ThemeContext";
import Home from "./components/Home";
import UserProvider from "./store/UserContext";
import NotificationProvider from "./store/NotificationContext";

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <UserProvider>
          <Home />
        </UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
