import React from 'react';
import ThemeProvider from './components/providers/ThemeProvider';
import Main from './components/Main';
import UserProvider from './components/providers/UserProvider';
import NotificationProvider from './components/providers/NotificationProvider';

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <NotificationProvider>
      <UserProvider>
        <ThemeProvider>
          <Main />
        </ThemeProvider>
      </UserProvider>
    </NotificationProvider>
  );
};

export default App;
