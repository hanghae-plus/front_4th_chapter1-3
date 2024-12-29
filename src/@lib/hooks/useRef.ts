import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // React의 useState를 이용해서 만들어보세요.
  const [ref] = useState<{ current: T }>({ current: initialValue });
  /**
   * ref.current를 통해 값이 변경이 가능한 이유
   * ref(참조값)은 그대로 두고 .current (속성)을 변경하는 것이라 가능
   */
  return ref;
}
