import {
  Header,
  MainLayout,
  MainSection,
  NotificationSystem,
} from "./components";
import { NotificationProvider, ThemeProvider, UserProvider } from "./contexts";

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
