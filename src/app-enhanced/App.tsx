import { MainSection } from "./components";
import { NotificationProvider } from "./contexts/notification";
import { ThemeProvider } from "./contexts/theme";
import { UserProvider } from "./contexts/user/UserProvider";

const App = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <UserProvider>
          <MainSection />
        </UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
