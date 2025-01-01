import { createContext, ReactNode, useContext, useState } from "react";
import { useCallback } from "../@lib";
import { generateItems } from "../utils";
import { Item } from "../types/item";

export interface AppContextType {
  theme: string;
  toggleTheme: () => void;
  items: Item[];
  addItems: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const [items, setItems] = useState<Item[]>(generateItems(1000));
  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);
  return (
    <AppContext.Provider value={{ theme, toggleTheme, items, addItems }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
