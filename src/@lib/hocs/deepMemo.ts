import { deepEquals } from "../equalities";
import { ComponentType } from "react";
import { memo } from "./memo.ts";

/**
 * deepMemo HOC는 컴포넌트의 props를 깊은 비교하여 불필요한 리렌더링을 방지합니다.
 * 객체의 중첩된 값까지 비교하여 실제 값의 변경이 있을 때만 리렌더링합니다.
 *
 * @example
 * const DeepMemoizedComponent = deepMemo(MyComponent);
 * // 객체의 내부 값이 같다면 리렌더링하지 않음
 * <DeepMemoizedComponent value={{ a: { b: 1 } }} />
 */
export function deepMemo<P extends object>(Component: ComponentType<P>) {
  // deepEquals 함수를 사용하여 props를 깊은 비교
  return memo(Component, deepEquals);
}
