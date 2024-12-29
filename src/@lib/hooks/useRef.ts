import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // { current: initialValue }을 초기값으로 가지는 ref 생성
  const [ref] = useState<{ current: T }>(() => ({ current: initialValue }));

  return ref;
}
