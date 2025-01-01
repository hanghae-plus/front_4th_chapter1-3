/* eslint-disable @typescript-eslint/no-unused-vars */
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals
): T {
  const ref = useRef<{ deps: DependencyList; value: T } | null>(null);

  if (ref.current == null || !_equals(_deps, ref.current.deps)) {
    ref.current = { deps: _deps, value: factory() };
    return ref.current.value;
  }

  return ref.current.value;
}
