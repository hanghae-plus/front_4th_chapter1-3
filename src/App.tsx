import { Header } from "./components/Header";
import { ItemList } from "./components/ItemList";
import { ComplexForm } from "./components/ComplexForm";
import { ThemeContextProvider } from "./context/ThemeContext";
import { ItemContextProvider, useItems } from "./context/ItemContext";
import { UserContextProvider } from "./context/UserContext";
import { NotificationContextProvider } from "./context/NotificationContext";
import { NotificationSystem } from "./components/NotificationSystem";

const App = () => {
  return (
    <ThemeContextProvider>
      <NotificationContextProvider>
        <UserContextProvider>
          <ItemContextProvider>
            <Header />
            <MainContent />
            <NotificationSystem />
          </ItemContextProvider>
        </UserContextProvider>
      </NotificationContextProvider>
    </ThemeContextProvider>
  );
};

// 아이템 리스트와 폼을 포함하는 메인 컨텐츠
const MainContent = () => {
  const { items, addItems } = useItems();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 md:pr-4">
          <ItemList items={items} onAddItemsClick={addItems} />
        </div>
        <div className="w-full md:w-1/2 md:pl-4">
          <ComplexForm />
        </div>
      </div>
    </div>
  );
};

export default App;
