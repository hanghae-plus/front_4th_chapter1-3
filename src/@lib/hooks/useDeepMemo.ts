import { DependencyList } from "react";
import { useMemo } from "./useMemo";
import { deepEquals } from "../equalities";

/**
 * useDeepMemo 훅은 깊은 비교를 사용하여 값을 메모이제이션합니다.
 * 의존성 배열의 값을 깊은 비교하여 구조적으로 같은 경우 이전 값을 재사용합니다.
 *
 * @example
 * // 객체의 내부 값까지 비교하여 같으면 재계산하지 않음
 * const memoizedValue = useDeepMemo(() => compute(obj), [{ a: 1, b: { c: 2 } }]);
 */
export function useDeepMemo<T>(factory: () => T, deps: DependencyList): T {
  // 1. useMemo를 사용하되, 비교 함수로 deepEquals를 사용
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, deps, deepEquals);
}
