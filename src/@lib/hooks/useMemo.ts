import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const prevDeps = useRef<DependencyList>([]);
  const memorized = useRef<T | null>(null);

  if (_equals(prevDeps.current, _deps) && memorized.current !== null) {
    return memorized.current;
  } else {
    prevDeps.current = _deps;
    memorized.current = factory();
  }

  return memorized.current;
}
