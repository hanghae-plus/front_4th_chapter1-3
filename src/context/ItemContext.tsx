import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Item } from "../types";
import { generateItems } from "../utils";

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
  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};

// 4. hook
export const useItems = () => {
  const context = useContext(ItemContext);
  if (!context) throw new Error("useItems must be used within a ItemProvider");
  return context;
};
