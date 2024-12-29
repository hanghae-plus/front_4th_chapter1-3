import { useState } from "react";
import { generateItems } from "./utils";
import {
  NotificationProvider,
  ThemeConsumer,
  ThemeProvider,
  UserProvider,
} from "./contexts";
import {
  ComplexForm,
  Header,
  ItemList,
  NotificationSystem,
} from "./components";

const App = () => {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

  return (
    <ThemeProvider>
      <NotificationProvider>
        <UserProvider>
          <ThemeConsumer>
            {(context) => (
              <div
                className={`min-h-screen ${context?.theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
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
            )}
          </ThemeConsumer>
        </UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
