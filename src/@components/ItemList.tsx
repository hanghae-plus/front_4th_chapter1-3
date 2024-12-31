import { useState, useTransition } from "react";
import { generateItems, renderLog } from "../utils";
import { useThemeStateContext } from "../@contexts/ThemeProvider";
import { usePreservedCallback } from "../@lib/hooks/usePreservedCallback";

interface ItemType {
  id: number;
  name: string;
  category: string;
  price: number;
}

function ItemList() {
  renderLog("ItemList rendered");

  const [items, setItems] = useState<ItemType[]>(() => generateItems(1000));
  const [filter, setFilter] = useState("");

  const [pending, startTransition] = useTransition();

  const { theme } = useThemeStateContext("ItemList");

  // const deferredFilter = useDeferredValue(filter);
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      item.category.toLowerCase().includes(filter.toLowerCase()),
  );

  const totalPrice = filteredItems.reduce((sum, item) => sum + item.price, 0);
  const averagePrice = Math.round(totalPrice / filteredItems.length) || 0;

  const handleAddItemsClick = usePreservedCallback(() => {
    startTransition(() => {
      setItems((prev) => [...prev, ...generateItems(1000, prev.length)]);
    });
  });

  const handleFilterChange = usePreservedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilter(e.target.value);
    },
  );

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">상품 목록</h2>
        <div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs"
            onClick={handleAddItemsClick}
          >
            대량추가
          </button>
        </div>
      </div>
      <input
        type="text"
        placeholder="상품 검색..."
        value={filter}
        onChange={handleFilterChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
      />
      <ul className="mb-4 mx-4 flex gap-3 text-sm justify-end">
        <li>검색결과: {filteredItems.length.toLocaleString()}개</li>
        <li>전체가격: {totalPrice.toLocaleString()}원</li>
        <li>평균가격: {averagePrice.toLocaleString()}원</li>
      </ul>
      <ul className="space-y-2">
        {pending
          ? "데이터를 준비 중이에요! (｡•̀ᴗ-)✧"
          : filteredItems.map(({ name, category, price }, index) => (
              <li
                key={index}
                className={`p-2 rounded shadow ${themeVariants[theme]}`}
              >
                {name} - {category} - {price.toLocaleString()}원
              </li>
            ))}
      </ul>
    </div>
  );
}

// Styles
const themeVariants = {
  dark: "bg-gray-700 text-white",
  light: "bg-white text-black",
} as const;

export default ItemList;
