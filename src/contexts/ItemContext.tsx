import { createContext, useCallback, useContext, useState } from "react";
import { IItem } from "../type/type";
import { generateItems } from "../utils";
import { useMemo } from "../@lib";

interface ItemContextType {
  items: IItem[];
  addItems: () => void;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (context === undefined) {
    throw new Error("fsjdkldjfkl");
  }
  return context;
};

export const ItemContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  const itemContextValue: ItemContextType = useMemo(
    () => ({
      items,
      addItems,
    }),
    [items],
  );

  return (
    <ItemContext.Provider value={itemContextValue}>
      {children}
    </ItemContext.Provider>
  );
};
