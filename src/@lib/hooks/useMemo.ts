import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef.ts";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const ref = useRef<{
    _deps: DependencyList;
    value: T;
  } | null>(null);

  if (ref.current === null || !_equals(_deps, ref.current._deps)) {
    ref.current = {
      _deps: _deps,
      value: factory(),
    };
  }

  return ref.current.value;
}
