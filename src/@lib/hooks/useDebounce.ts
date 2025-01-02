import { useEffect, useState } from "react";

/**
 * useDebounce 훅
 * @description useEffect를 활용한 debouncing 구현
 * @param value {string}
 * @param delay {number} = 300
 * @returns {string}
 * @example
 * const debouncedValue = useDebounce(value, 500);
 */
export function useDebounce(value: string, delay: number = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
