import { useState } from "react";
import { IItem } from "../types";
import { generateItems } from "../utils.ts";
import { useCallback, useMemo } from "../@lib";

export const useHandleItem = () => {
  const [items, setItems] = useState<IItem[]>(() => generateItems(1000));
  const [filter, setFilter] = useState("");

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  const filteredItems = useMemo(
    () =>
      items.filter(
        (item) =>
          item.name.toLowerCase().includes(filter.toLowerCase()) ||
          item.category.toLowerCase().includes(filter.toLowerCase()),
      ),
    [items, filter],
  );

  const totalPrice = useMemo(
    () => filteredItems.reduce((sum, item) => sum + item.price, 0),
    [filteredItems],
  );

  const averagePrice = useMemo(
    () => Math.round(totalPrice / filteredItems.length) || 0,
    [totalPrice, filteredItems.length],
  );

  return {
    addItems,
    filter,
    setFilter,
    filteredItems,
    totalPrice,
    averagePrice,
  };
};
