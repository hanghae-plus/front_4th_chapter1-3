import { useState } from "react";

// 변경되지 않는 값을 저장하거나 컴포넌트 리렌더링 간에 값을 유지하는 용도로 사용
export function useRef<T>(initialValue: T): { current: T } {
  // ref: 상태값, 컴포넌트가 리렌더링 될때마다 새로운 값으로 갱신될 수 있음.
  // 그러나 useState 는 객체를 리렌더링 시점에 고정할 수 있는 방식으로 상태를 유지.
  const [ref] = useState<{ current: T }>({ current: initialValue });
  return ref;
}
