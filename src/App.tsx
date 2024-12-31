import { Header } from "./components/Header";
import { NotificationSystem } from "./features/notification/System";
import { ComplexForm } from "./components/ComplexForm";
import { ItemList } from "./features/product/ItemList";
import { useAppContext } from "./contexts/useAppContext";

const App = () => {
  const { theme, items, addItems } = useAppContext();

  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      <Header />
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
      <NotificationSystem />
    </div>
  );
};

export default App;
