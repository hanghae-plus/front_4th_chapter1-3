import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const memoizedValue = useRef<T>();
  const prevDeps = useRef<DependencyList>();

  if (!prevDeps.current) {
    memoizedValue.current = factory();
    prevDeps.current = _deps;

    return memoizedValue.current;
  }

  if (!_equals(prevDeps.current, _deps)) {
    memoizedValue.current = factory();
    prevDeps.current = _deps;
  }

  return memoizedValue.current as T;
}
