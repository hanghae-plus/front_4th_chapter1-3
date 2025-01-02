import { useState } from "react";

export function useRef<T>(initialValue: T | (() => T)): { current: T } {
  // React의 useState를 이용해서 만들어보세요.

  const [refState] = useState<{ current: T }>(() => {
    return {
      current:
        typeof initialValue === "function"
          ? // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
            (initialValue as Function)()
          : initialValue,
    };
  });

  return refState;
}
