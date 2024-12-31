import { renderLog } from "./utils";
import { ItemList } from "./components/item-list/ItemList";
import { ComplexForm } from "./components/complex-form/ComflexForm";
import { Header } from "./components/header/Header";
import { NotificationSystem } from "./components/notification-system/NotificationSystem";
import { ThemeProvider } from "./contexts/theme-context/ThemeProvider";
import AppLayout from "./components/layout/app-layout/AppLayout";
import { UserProvider } from "./contexts/user-context/UserProvider";
import { NotificationProvider } from "./contexts/notification-context/NotificationProvider";

const App: React.FC = () => {
  renderLog("App rendered");

  return (
    <ThemeProvider>
      <NotificationProvider>
        <UserProvider>
          <AppLayout>
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
          </AppLayout>
        </UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
