import { useState } from "react";
import { useMemo } from "../@lib";
import { useTheme } from "../context/themeContext";
import { generateItems, renderLog } from "../utils";

// ItemList 컴포넌트
export const ItemList: React.FC = () => {
  renderLog("ItemList rendered");

  // 테마 컨텍스트 분리 사용
  const { theme } = useTheme();

  // 대량 데이터 생성 (메모이제이션)
  // 빈 의존성 배열은 초기 렌더링 이후 지속되는 메모이제이션

  // (1) 궁금증 : 메모이제이션을 할 경우 useState와 useMemo 두곳에 값을 저장하는가?
  // -> 그렇다면 단순 메모리에 저장하는 비용은 리렌더링 비용보다 저렴한가?

  // (2) 궁금증 : useMemo를 사용하는것과 useState의 지연초기화 방법의 차이는 무엇인가?
  // -> 아래 방법은 컴포넌트 최초 렌더링 시에만 실행되는것이 아닌가?
  // const [items, setItems] = useState(() => generateItems(1000));

  const memoizedItems = useMemo(() => generateItems(1000), []);

  const [items, setItems] = useState(memoizedItems);
  const [filter, setFilter] = useState("");

  const filteredItems = useMemo(
    () =>
      items.filter(
        (item) =>
          item.name.toLowerCase().includes(filter.toLowerCase()) ||
          item.category.toLowerCase().includes(filter.toLowerCase())
      ),
    [items, filter]
  );

  // useMemo 사용 이유
  // 배열 순회 비용 최소화 (filteredItems 변경시 재계산)
  const totalPrice = useMemo(
    () => filteredItems.reduce((sum, item) => sum + item.price, 0),
    [filteredItems]
  );

  // useMemo 사용하지 않은 이유
  // 단순 계산이므로 메모이제이션 필요 없음
  const averagePrice = Math.round(totalPrice / filteredItems.length) || 0;

  // useCallback 사용하지 않은 이유
  // 단순 함수 호출이므로 메모이제이션 필요 없음?
  const onAddItemsClick = () => {
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
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs"
            onClick={onAddItemsClick}
          >
            대량추가
          </button>
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
          <li
            key={index}
            className={`p-2 rounded shadow ${theme === "light" ? "bg-white text-black" : "bg-gray-700 text-white"}`}
          >
            {item.name} - {item.category} - {item.price.toLocaleString()}원
          </li>
        ))}
      </ul>
    </div>
  );
};
