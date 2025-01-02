import { useState } from "react";

/**
 * useState를 활용한 useRef 구현
 * @description
 * - 객체의 참조 동일성을 이용해 리렌더링간 값 보존
 * - setState를 생략함으로 인해 ref.current 값 변경 시에도 불필요한 리렌더링 방지
 * @param initialValue
 * @returns {current: T}
 */
export function useRef<T>(initialValue: T): { current: T } {
  const [ref] = useState<{ current: T }>(() => ({ current: initialValue }));

  return ref;
}
