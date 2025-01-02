import {
  ComplexForm,
  Header,
  ItemList,
  NotificationSystem,
} from "./components";
import {
  ThemeProvider,
  UserProvider,
  NotificationProvider,
  useTheme,
} from "./contexts";

// test를 App에서 해서 main.tsx는 활용 불가
const AppBody: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"
      }`}
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

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <UserProvider>
          <AppBody />
        </UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
