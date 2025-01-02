import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const prevDeps = useRef<DependencyList | null>(null);
  const prevResult = useRef<T | null>(null);

  if (
    prevResult.current === null ||
    prevDeps.current === null ||
    !_equals(prevDeps.current, _deps)
  ) {
    prevDeps.current = _deps;
    prevResult.current = factory();
  }

  return prevResult.current;
}
