import Header from "./@components/Header";
import ItemList from "./@components/ItemList";
import NotificationsProvider from "./@contexts/NotificationsContext";
import ThemeProvider, { useThemeStateContext } from "./@contexts/ThemeContext";
import UserProvider from "./@contexts/UserContext";
import ComplexForm from "./@components/ComplexForm";
import NotificationSystem from "./@components/NotificationSystem";
import Portal from "./@components/Portal";

function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <NotificationsProvider>
          <Root>
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
          </Root>

          <Portal id="notification">
            <NotificationSystem />
          </Portal>
        </NotificationsProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

// Subcomponents
interface RootProps {
  children: React.ReactNode;
}

const Root = ({ children }: RootProps) => {
  const { mode } = useThemeStateContext("Root");
  return <div className={`min-h-screen ${colorScheme[mode]}`}>{children}</div>;
};

// Styles
const colorScheme = {
  dark: "bg-gray-900 text-white",
  light: "bg-gray-100 text-black",
} as const;

export default App;
