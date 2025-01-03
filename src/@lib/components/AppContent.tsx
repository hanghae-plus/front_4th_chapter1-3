import { useTheme } from "../contexts/ThemeContext";
import { memo } from "../hocs";
import { Item } from "../types";
import { ComplexForm } from "./ComplexForm";
import { Header } from "./Header";
import { ItemList } from "./ItemList";
import { NotificationSystem } from "./NotificationSystem";

interface AppContentProps {
  items: Item[];
  onAddItems: () => void;
}

export const AppContent: React.FC<AppContentProps> = memo(
  ({ items, onAddItems }) => {
    const { theme } = useTheme();

    return (
      <div
        className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
      >
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 md:pr-4">
              <ItemList items={items} onAddItemsClick={onAddItems} />
            </div>
            <div className="w-full md:w-1/2 md:pl-4">
              <ComplexForm />
            </div>
          </div>
        </div>
        <NotificationSystem />
      </div>
    );
  },
);
