/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useMemo } from "./useMemo";
import { shallowEquals } from "../equalities";

/**
 * useCallback 훅은 콜백 함수를 메모이제이션합니다.
 * 의존성 배열의 값이 변경될 때만 새로운 함수를 생성합니다.
 *
 * @example
 * const memoizedCallback = useCallback(
 *   () => {
 *     doSomething(a, b);
 *   },
 *   [a, b],
 * );
 */
export function useCallback<T extends Function>(
  callback: T,
  deps: DependencyList,
  equals: (a: DependencyList, b: DependencyList) => boolean = shallowEquals,
): T {
  // useMemo를 사용하여 callback 함수를 메모이제이션
  return useMemo(() => callback, deps, equals);
}
