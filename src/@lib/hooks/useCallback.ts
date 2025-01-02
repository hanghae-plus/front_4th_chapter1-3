import { DependencyList, useMemo } from "react";

export function useCallback<
  F extends (...args: Parameters<F>) => ReturnType<F>,
>(factory: F, deps: DependencyList): F {
  return useMemo(() => factory, deps);
}
