import { ThemeProvider } from "./Providers/ThemeProvider";
import { Layout } from "./Components/Layout";
import { AuthProvider } from "./Providers/AuthProvider";
import { NotificationProvider } from "./Providers/NotificationProvider";

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <ThemeProvider defaultTheme={"light"}>
          <Layout />
        </ThemeProvider>
      </AuthProvider>
    </NotificationProvider>
  );
};

export default App;
