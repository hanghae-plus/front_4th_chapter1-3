import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // useState 반환값의 첫번째만 사용
  // useRef는 값이 변경되어도 리렌더링을 trigger하지 않아야 하므로 setState는 사용하지 않는다
  // useRef의 표준 반환 타입과 일치시키기 위해 {current: T}를 추가한다
  const [ref] = useState({ current: initialValue });

  return ref;
}
