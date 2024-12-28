import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // lazy initialization을 통해 state가 처음 만들어 질 때만 실행
  // update함수를 사용하지 않고 직접 ref를 조작해 값을 바꾸게 함 like ref.current
  const [ref] = useState(() => ({
    current: initialValue,
  }));

  return ref;
}
