import {
  ComplexForm,
  Header,
  ItemList,
  NotificationSystem,
} from "./components";
import { NotificationProvider, ThemeProvider, UserProvider } from "./context";

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <ThemeProvider>
        <UserProvider>
          <div className="min-h-screen">
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
        </UserProvider>
      </ThemeProvider>
    </NotificationProvider>
  );
};

export default App;
