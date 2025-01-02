import { deepEquals } from "../equalities";
import { memo } from "./memo";

// 🎯 컴포넌트의 props를 깊은 비교하여 불필요한 리렌더링을 방지.
// 🎯 memo, deepEquals 함수를 사용하여 props 비교
export function deepMemo<P extends object>(Component: React.ComponentType<P>) {
  return memo(Component, deepEquals);
}
