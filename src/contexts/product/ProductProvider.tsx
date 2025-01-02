import { ReactNode, useState } from "react";

import { generateItems } from "../../utils";
import { ProductContextType } from "./type";
import { ProductContext } from "./ProductContext";

interface ProductProviderProps {
  children: ReactNode;
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

  const value: ProductContextType = {
    items,
    addItems,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
