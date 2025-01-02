import {
  NotificationProvider,
  ThemeProvider,
  UserProvider,
} from "./@lib/provider";
import { AppContainer } from "./components";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <UserProvider>
          <AppContainer />
        </UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
