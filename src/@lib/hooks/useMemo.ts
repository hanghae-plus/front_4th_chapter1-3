import { DependencyList } from "react";
import { useRef } from "@/@lib/hooks/useRef";
import { shallowEquals } from "@/@lib/equalities";

export function useMemo<T>(
  factory: () => T,
  deps: DependencyList,
  equals = shallowEquals,
): T {
  const memoized = useRef<{ deps: DependencyList; value: T } | null>(null);

  if (memoized.current === null || !equals(memoized.current.deps, deps)) {
    memoized.current = {
      deps,
      value: factory(),
    };
  }

  return memoized.current.value;
}
