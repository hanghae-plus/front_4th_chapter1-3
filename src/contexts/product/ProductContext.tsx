import { createContext } from "react";
import { ProductContextType } from "./type";

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined,
);
