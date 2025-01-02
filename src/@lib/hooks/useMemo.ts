import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const ref = useRef<{ value: T; deps: DependencyList } | null>(null);

  if (ref.current === null || !_equals(ref.current.deps, _deps)) {
    const newValue = factory();
    ref.current = { value: newValue, deps: _deps };
    return newValue;
  }

  return ref.current.value;
}
