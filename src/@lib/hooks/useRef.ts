import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // 1. useState를 이용하여 상태 생성
  const [ref] = useState(() => ({ current: initialValue }));

  // 2. ref 객체 반환
  return ref;
}
