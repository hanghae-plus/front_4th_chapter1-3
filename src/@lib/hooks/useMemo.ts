import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const ref = useRef<{
    deps: DependencyList | null;
    result: T | null;
  }>({
    deps: null,
    result: null,
  });

  // 2. 현재 의존성과 이전 의존성 비교
  const shouldUpdate =
    ref.current.deps === null || !_equals(ref.current.deps, _deps);

  if (shouldUpdate) {
    ref.current.deps = _deps;
    ref.current.result = factory();
  }

  return ref.current.result!;
}
