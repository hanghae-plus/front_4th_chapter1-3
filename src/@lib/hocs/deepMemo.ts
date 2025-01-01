import { ComponentType } from "react";
import { memo } from "./memo";
import { deepEquals } from "../equalities";
// deepMemo HOC는 컴포넌트의 props를 깊은 비교하여 불필요한 리렌더링을 방지합니다.

export function deepMemo<P extends object>(Component: ComponentType<P>) {
  // deepEquals 함수를 사용하여 props 비교
  return memo(Component, deepEquals);
}
