import { useState } from "react";
import { Item } from "../interface/item";
import { generateItems, renderLog } from "../../utils";
import { useCallback, useMemo } from "../hooks";
import { memo } from "../hocs";
import { useThemeContext } from "../hooks/useThemeContext";

// ItemList 컴포넌트
export const ItemList: React.FC = memo(() => {
  renderLog("ItemList rendered");
  const [filter, setFilter] = useState("");
  const { theme } = useThemeContext();

  const [items, setItems] = useState<Item[]>(() => generateItems(1000));

  //이유가 뭔지 알아보기
  const onAddItemsClick = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredItems = useMemo(() => {
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.category.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [items, filter]);

  return (
    <div>
      <div className="mb-4 flex items-center space-x-4">
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="상품 검색..."
          className="px-4 py-2 border rounded"
        />
        <button
          onClick={onAddItemsClick}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          아이템 추가
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded shadow ${theme === "light" ? "bg-white text-black" : "bg-gray-700 text-white"}`}
          >
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-600">{item.category}</p>
            <p className="text-green-600 font-bold">
              {item.price.toLocaleString()}원
            </p>
          </div>
        ))}
      </div>
    </div>
  );
});
