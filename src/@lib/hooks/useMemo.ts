import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

// useMemo 훅은 계산 비용이 높은 값을 메모이제이션합니다.
export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const memoizedValue = useRef<T | null>(null);
  const prevDeps = useRef(_deps);

  if (memoizedValue.current === null || !_equals(prevDeps.current, _deps)) {
    memoizedValue.current = factory();
    prevDeps.current = _deps;
  }

  return memoizedValue.current;
}
