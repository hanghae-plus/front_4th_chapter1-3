import { useEffect, useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  const [currentValue, setCurrentValue] = useState({ current: initialValue });

  useEffect(() => {
    if (initialValue) setCurrentValue({ current: initialValue });
  });

  return currentValue;
}
