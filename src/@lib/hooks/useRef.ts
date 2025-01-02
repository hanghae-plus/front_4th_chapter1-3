import { useState } from "react";

/**
 * useRef 훅은 렌더링 사이에 값을 유지하는 가변 ref 객체를 생성합니다.
 * ref 객체의 값이 변경되어도 컴포넌트가 리렌더링되지 않습니다.
 *
 * @example
 * const ref = useRef(0);
 * ref.current += 1; // 리렌더링 발생하지 않음
 */
export function useRef<T>(initialValue: T): { current: T } {
  // useState의 첫 번째 렌더링에서만 초기값이 설정되는 특성을 활용
  const [ref] = useState<{ current: T }>({ current: initialValue });
  return ref;
}
