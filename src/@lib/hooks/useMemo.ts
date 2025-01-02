import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

/**
 * useMemo 훅은 계산 비용이 높은 값을 메모이제이션
 * 의존성 배열의 값이 변경될 때만 factory 함수를 재실행
 *
 * @example
 * const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
 */
export function useMemo<T>(
  factory: () => T,
  deps: DependencyList,
  _equals: (a: DependencyList, b: DependencyList) => boolean = shallowEquals,
): T {
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const ref = useRef<{
    deps: DependencyList;
    value: T;
    initialized: boolean;
  }>({
    deps: [],
    value: undefined as T,
    initialized: false,
  });

  // 2. 현재 의존성과 이전 의존성 비교
  const depsChanged =
    !ref.current.initialized || !_equals(deps, ref.current.deps);

  // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
  if (depsChanged) {
    ref.current.deps = deps;
    ref.current.value = factory();
    ref.current.initialized = true;
  }

  // 4. 메모이제이션된 값 반환
  return ref.current.value;
}
