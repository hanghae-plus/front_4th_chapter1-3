import { DependencyList, useRef } from "react";
import { deepEquals } from "../equalities";

export function useDeepMemo<T>(factory: () => T, deps: DependencyList): T {
  const lastDepsRef = useRef<DependencyList | undefined>(undefined);
  const lastValueRef = useRef<T | undefined>(undefined);

  const dependenciesChanged =
    !lastDepsRef.current || !deepEquals(lastDepsRef.current, deps);

  if (dependenciesChanged) {
    lastValueRef.current = factory();
    lastDepsRef.current = deps;
  }

  return lastValueRef.current as T;
}
