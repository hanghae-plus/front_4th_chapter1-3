import { useEffect, useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // React의 useState를 이용해서 만들어보세요.
  const [ref] = useState<{ current: T }>({ current: initialValue });

  // ref current 값이 바뀌면 initialValue를 업데이트
  useEffect(() => {
    ref.current = initialValue;
  }, [initialValue, ref]);

  return ref;
}
