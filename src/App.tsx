import React from "react";
// import { generateItems } from "./utils";
// import { IAppContext, INotificationContext } from "./types/Context";
// import { INotification } from "./types/Notification";
// import { AppContext } from "./utils/AppContext";
import { Header } from "./components/Header";
import { NotificationSystem } from "./components/NotificationSystem";
import { ComplexForm } from "./components/ComplexForm";
import { ItemList } from "./components/ItemList";
import { UserProvider } from "./@context/userContext";
import { NotiProvider } from "./@context/notiContext";
import { ThemeProvider } from "./@context/themeContext";

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotiProvider>
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
      </NotiProvider>
    </ThemeProvider>
  );
};

export default App;
