import { NotificationContextProvider } from "./context/NotificationContextProvider";
import { ThemeContextProvider } from "./context/ThemeContextProvider";
import { LoginContextProvider } from "./context/LoginContextProvider";
import { useThemeContext } from "./@lib";
import { Header } from "./component/Header";
import { ItemList } from "./component/ItemList";
import { ComplexForm } from "./component/ComplexForm";
import { NotificationSystem } from "./component/NotificationSystem";

const App: React.FC = () => {
  return (
    <NotificationContextProvider>
      <ThemeContextProvider>
        <LoginContextProvider>
          <AppContent />
        </LoginContextProvider>
      </ThemeContextProvider>
    </NotificationContextProvider>
  );
};

const AppContent: React.FC = () => {
  const { theme } = useThemeContext();

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
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
    </div>
  );
};

export default App;
