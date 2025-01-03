import { Item } from "../../types";

export interface ItemContextType {
  items: Item[];
  addItems: () => void;
}
