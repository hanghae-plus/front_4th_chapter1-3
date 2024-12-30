import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const ref = useRef<null | { deps: DependencyList; value: T }>(null);

  // deps에 변화가 생기면 값을 리턴
  if (!ref.current || !_equals(_deps, ref.current.deps)) {
    ref.current = {
      deps: _deps,
      value: factory(),
    };
  }

  return ref.current.value;
}
