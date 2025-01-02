import { Item } from "./entities.ts";

export interface AppLayoutProps {
  theme: string;
  items: Item[];
  onAddItems: (count?: number) => void;
}
