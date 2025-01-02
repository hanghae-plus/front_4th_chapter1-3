import { ComponentType } from "react";
import { memo } from "./memo";
import { deepEquals } from "../equalities";

/**
 * 전달된 React Component를 깊은 비교하여 메모이제이션하는 고차 함수.
 * props가 변경된 경우에만 컴포넌트를 다시 렌더링합니다.
 *
 * @param {ComponentType<P>} Component - 메모이제이션할 React Component.
 * @returns  메모이제이션된 Component
 */
export function deepMemo<P extends object>(Component: ComponentType<P>) {
  return memo(Component, deepEquals);
}
