import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef.ts";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const ref = useRef<T | null>(null);
  const deps = useRef<DependencyList | null>(null);

  if (
    ref.current === null ||
    deps.current === null ||
    !_equals(deps.current, _deps)
  ) {
    ref.current = factory();
    deps.current = _deps;
  }

  return ref.current;
}
