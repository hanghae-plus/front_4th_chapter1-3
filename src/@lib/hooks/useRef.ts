import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // useState를 사용하여 ref 객체를 생성하고 유지
  const [ref] = useState({ current: initialValue });
  return ref;
}
