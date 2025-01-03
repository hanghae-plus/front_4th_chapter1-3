import { useContext } from "react";
import { ItemContext } from "./ItemContex";

// 커스텀 훅: useItemContext
export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (context === undefined) {
    throw new Error("useItemContext must be used within an ItemProvider");
  }
  return context;
};
