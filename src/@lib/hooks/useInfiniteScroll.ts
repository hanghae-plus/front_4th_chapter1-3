import { useEffect, useState } from "react";
import { generateItems } from "../../utils.ts";
import { useCallback } from "./useCallback.ts";
import { useMemo } from "./useMemo.ts";
import { useRef } from "./useRef.ts";

const fetchItems = async (page: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return generateItems(100, page * 100);
};

/**
 * 무한 스크롤 Custom Hook
 * 초기 아이템 1000개 생성 후 스크롤 시 100개씩 추가 로드
 */
export function useInfiniteScroll() {
  const [items, setItems] = useState(() => generateItems(1000));
  const [page, setPage] = useState(10);
  const [filter, setFilter] = useState("");

  /**
   * loading의 경우 React State이며 상태가 비동기적으로 발생함.
   * 따라서 연속된 스크롤 이벤트시 false인 경우 존재 -> loadMoreItems 중복 호출
   * useRef는 동기적으로 즉시 값이 업데이트되어 리렌더링 없이 즉시 반영됨.
   */
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);

  const filteredItems = useMemo(() => {
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.category.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [filter, items]);

  const totalPrice = useMemo(() => {
    return filteredItems.reduce((sum, item) => sum + item.price, 0);
  }, [filteredItems]);

  const averagePrice = useMemo(() => {
    return Math.round(totalPrice / filteredItems.length) || 0;
  }, [filteredItems.length, totalPrice]);

  const addItems = useCallback(() => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  }, []);

  const loadMoreItems = useCallback(async () => {
    if (loading || loadingRef.current) return;

    try {
      setLoading(true);
      loadingRef.current = true;

      const newItems = await fetchItems(page);
      setItems((prevItems) => [...prevItems, ...newItems]);
      setPage((prevPage) => prevPage + 1);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    // 스크롤 이벤트 쓰로틀링
    // 연속 호출에도 100ms 단위로 한번만 호출되도록 설정
    let throttleFlag = false;

    const handleScroll = () => {
      if (throttleFlag) return;

      const scrolledToBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100;

      if (scrolledToBottom && !loading) {
        throttleFlag = true;
        loadMoreItems();

        // 100ms 후에 다시 실행 가능하도록 설정
        setTimeout(() => {
          throttleFlag = false;
        }, 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreItems]);

  return {
    items,
    loading,
    addItems,
    filteredItems,
    totalPrice,
    averagePrice,
    filter,
    setFilter,
  };
}
