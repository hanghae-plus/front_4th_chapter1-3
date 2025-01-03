import { useState } from "react";
import { generateItems } from "../../utils";
import { ItemContextType } from "./types";
import { ItemContext } from "./ItemContex";

export const ItemProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

  const value: ItemContextType = {
    items,
    addItems,
  };
  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};
