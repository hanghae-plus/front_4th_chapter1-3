import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Item } from "../types";
import { generateItems } from "../utils";
import { useNotification } from "./NotificationContext";

// 1. type
interface ItemContextType {
  items: Item[];
  addItems: () => void;
}

interface PropsWithChildren {
  children: React.ReactNode;
}

// 2. context
const ItemContext = createContext<ItemContextType | null>(null);

// 3. provider
export const ItemContextProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState(generateItems(1000));
  const { addNotification } = useNotification();

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
    addNotification("1000개의 아이템이 추가되었습니다", "success");
  }, []);

  const value = useMemo(
    () => ({
      items,
      addItems,
    }),
    [items, addItems]
  );

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};

// 4. hook
export const useItems = () => {
  const context = useContext(ItemContext);
  if (!context) throw new Error("useItems must be used within a ItemProvider");
  return context;
};
