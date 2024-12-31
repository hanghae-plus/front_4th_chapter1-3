import { useEffect, useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  const [currentValue, setCurrent] = useState({ current: initialValue });

  useEffect(() => {
    if (initialValue) setCurrent({ current: initialValue });
  }, [initialValue]);
  
  return currentValue;
}
