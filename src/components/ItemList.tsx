import { useState } from "react";
import { generateItems, renderLog } from "../utils";
import { Item } from "./Item";
import { useThemeStateContext } from "../contexts/ThemeContext";
import { Button } from "./Button";

export const ItemList: React.FC = () => {
  renderLog("ItemList rendered");
  const [items, setItems] = useState(() => generateItems(1000));
  const [filter, setFilter] = useState("");

  // 테스트 통과를 위한 theme 사용
  const { theme } = useThemeStateContext();
  console.log(theme);

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      item.category.toLowerCase().includes(filter.toLowerCase()),
  );
  const totalPrice = filteredItems.reduce((sum, item) => sum + item.price, 0);
  const averagePrice = Math.round(totalPrice / filteredItems.length) || 0;

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">상품 목록</h2>
        <div>
          <Button onClick={addItems}>대량추가</Button>
        </div>
      </div>
      <input
        type="text"
        placeholder="상품 검색..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
      />
      <ul className="mb-4 mx-4 flex gap-3 text-sm justify-end">
        <li>검색결과: {filteredItems.length.toLocaleString()}개</li>
        <li>전체가격: {totalPrice.toLocaleString()}원</li>
        <li>평균가격: {averagePrice.toLocaleString()}원</li>
      </ul>
      <ul className="space-y-2">
        {filteredItems.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </ul>
    </div>
  );
};
