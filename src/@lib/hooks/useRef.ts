import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  const [value] = useState<{ current: T }>({ current: initialValue });

  return value;
}
