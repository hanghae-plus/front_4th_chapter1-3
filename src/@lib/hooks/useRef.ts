import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // NOTE: useState에 객체 타입 지정하고 초기값으로 객체 생성 후 구조분해 할당으로 첫 번째 값만 가져옴
  const [ref] = useState<{ current: T }>({ current: initialValue });

  return ref;
}
