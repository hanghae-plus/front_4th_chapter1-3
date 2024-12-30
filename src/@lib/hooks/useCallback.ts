/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useMemo } from "./useMemo"; // Assuming custom useMemo is available
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList,
) {
  const cachedDeps = useRef<DependencyList | null>(null);

  const cachedCallback = useMemo(() => {
    if (!cachedDeps.current || !shallowEquals(cachedDeps.current, _deps)) {
      cachedDeps.current = _deps;
      return factory;
    }
    return cachedDeps.current ?? factory;
  }, _deps);

  return cachedCallback as T;
}
