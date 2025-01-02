import {
  Header,
  MainLayout,
  MainSection,
  NotificationSystem,
} from "./components";
import { NotificationProvider } from "./contexts/notification";
import { ThemeProvider } from "./contexts/theme";
import { UserProvider } from "./contexts/user";

const App = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <UserProvider>
          <MainLayout>
            <Header />
            <MainSection />
            <NotificationSystem />
          </MainLayout>
        </UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
