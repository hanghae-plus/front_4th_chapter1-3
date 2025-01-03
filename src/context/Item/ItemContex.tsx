import { createContext } from "react";
import { ItemContextType } from "./types";

export const ItemContext = createContext<ItemContextType | undefined>(
  undefined,
);
