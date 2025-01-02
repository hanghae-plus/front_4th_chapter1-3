import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.
  const value = useRef<T | null>(null);
  const deps = useRef(_deps);

  if (value.current === null || !_equals(deps.current, _deps)) {
    value.current = factory();
    deps.current = _deps;
  }

  return value.current;
}
