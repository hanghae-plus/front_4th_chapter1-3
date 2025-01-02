import { useState } from "react";
// 🎯 렌더링 사이에 값을 유지하는 가변 ref 객체를 생성.
// 🎯 렌더링 간에 값이 유지되고, 값이 변경되어도 리렌더링을 트리거하지 않는다
export function useRef<T>(initialValue: T): { current: T } {
  const [ref] = useState({ current: initialValue });

  return ref as { current: T };
}
