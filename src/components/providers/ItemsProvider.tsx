import React, { createContext, useState } from 'react';
import { generateItems } from '../../utils';
import { Item } from '../../@lib/type/type';

interface ItemsContextType {
  items: Item[];
  addItems: () => void;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

const ItemsProvider = ({ children }: Props) => {
  const [items, setItems] = useState<Item[]>(generateItems(1000));

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };
  const itemsContextValue = {
    items,
    addItems,
  };
  return (
    <ItemsContext.Provider value={itemsContextValue}>
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsProvider;
export { ItemsContext };
export type { ItemsContextType };
