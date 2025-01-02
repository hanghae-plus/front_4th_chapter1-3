import { Item } from "../../features/product/entity";

export interface ProductContextType {
  items: Item[];
  addItems: () => void;
}
