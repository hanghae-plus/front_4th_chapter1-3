import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // useRef, useState 모두 컴포넌트의 라이프사이클 동안 값을 유지하는 게 필요함.
  // useState는 값의 변동이 있을 때 리랜더링이 일어남. 참조의 경우도 참조값이 변해야 함. 그래서, useState의 기본 기능을 활용하되, 참조값을 업데이트 하지 않는 방식으로 구현.
  const [refObject] = useState({ current: initialValue });
  return refObject;
}
