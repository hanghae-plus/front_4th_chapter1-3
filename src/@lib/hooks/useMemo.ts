import { useRef } from "./useRef";
import { shallowEquals } from "../equalities";
import { DependencyList } from "react";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const cachedFactory = useRef<T | null>(null);
  const cachedDeps = useRef<DependencyList | null>(null);

  if (!cachedDeps.current || !_equals(cachedDeps.current, _deps)) {
    cachedDeps.current = _deps;
    cachedFactory.current = factory();
  }

  return cachedFactory.current as T;
}
