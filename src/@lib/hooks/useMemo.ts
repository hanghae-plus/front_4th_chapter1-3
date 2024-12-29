import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const valueRef = useRef<T | null>(null);
  const depsRef = useRef(_deps);

  if (valueRef.current === null || !_equals(depsRef.current, _deps)) {
    valueRef.current = factory();
    depsRef.current = _deps;
  }

  return valueRef.current;
}
