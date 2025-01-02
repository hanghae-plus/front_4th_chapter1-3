import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // 새로알게된 정보 객체로 useState 를 초기화하는 것 보다 함수로 구현하게되면 리렌더링 관점에서 효율적!
  const [ref] = useState<{ current: T }>(() => ({ current: initialValue }));
  /**
   * ref.current를 통해 값이 변경이 가능한 이유
   * ref(참조값)은 그대로 두고 .current (속성)을 변경하는 것이라 가능
   */
  return ref;
}
