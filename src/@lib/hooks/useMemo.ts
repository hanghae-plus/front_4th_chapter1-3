import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const value = useRef<T | null>(null);
  const deps = useRef(_deps);

  if (value.current === null || !_equals(deps.current, _deps)) {
    value.current = factory();
    deps.current = _deps;
  }
  return value.current;
}
