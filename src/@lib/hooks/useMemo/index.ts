import { DependencyList } from "react";
import { useRef } from "../useRef";
import { shallowEquals } from "../../equalities/shallowEquals";
import { EqualityFn, MemoRef } from "./types";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals: EqualityFn = shallowEquals,
): T {
  const ref = useRef<MemoRef<T>>({
    value: undefined,
    deps: undefined,
  });

  if (ref.current.deps === undefined || !_equals(ref.current.deps, _deps)) {
    ref.current.value = factory();
    ref.current.deps = _deps;
  }

  return ref.current.value as T;
}
