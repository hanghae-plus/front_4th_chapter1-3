import { useState } from "react";

// React의 useState를 이용해서 만들어보세요.
export function useRef<T>(initialValue: T): { current: T } {
  const [ref] = useState(() => ({ current: initialValue }));

  return ref;
}
