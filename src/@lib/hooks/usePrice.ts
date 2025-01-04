import { useItem } from "./useItem";

export function usePrice() {
  const { filteredItems } = useItem();

  const totalPrice = filteredItems.reduce((sum, item) => sum + item.price, 0);

  const averagePrice = Math.round(totalPrice / filteredItems.length) || 0;

  return { totalPrice, averagePrice };
}
