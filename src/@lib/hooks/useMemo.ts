import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.
  const prev = useRef<DependencyList | null>(null);
  const memoValue = useRef<T | null>(null);

  if (prev.current == null) {
    memoValue.current = factory();
    prev.current = _deps;

    return memoValue.current;
  }

  if (!_equals(prev.current, _deps)) {
    memoValue.current = factory();
    prev.current = _deps;
  }

  return memoValue.current as T;
}
