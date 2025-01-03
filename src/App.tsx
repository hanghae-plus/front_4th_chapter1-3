import React, { useState } from "react";
import { generateItems } from "./utils";
import { useCallback, useMemo } from "./@lib";
import { INITIAL_ITEMS_COUNT } from "./@lib/constants";
import { ThemeProvider } from "./@lib/contexts/ThemeContext";
import { UserProvider } from "./@lib/contexts/UserContext";
import { NotificationProvider } from "./@lib/contexts/NotificationContext";
import { AppContent } from "./@lib/components/AppContent";

const App: React.FC = () => {
  const initialItems = useMemo(() => generateItems(INITIAL_ITEMS_COUNT), []);
  const [items, setItems] = useState(initialItems);

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  return (
    <NotificationProvider>
      <ThemeProvider>
        <UserProvider>
          <AppContent items={items} onAddItems={addItems} />
        </UserProvider>
      </ThemeProvider>
    </NotificationProvider>
  );
};

export default App;
