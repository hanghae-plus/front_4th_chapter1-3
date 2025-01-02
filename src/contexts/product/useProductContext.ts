import { useContext } from "react";
import { ProductContext } from "./ProductContext";

export function useProductContext() {
  const context = useContext(ProductContext);

  if (context === undefined) {
    throw new Error("useProductContext must be used within an ProductProvider");
  }

  return context;
}
