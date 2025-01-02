import { DependencyList } from "react";
import { useMemo } from "./useMemo";

export function useCallback<T>(factory: T, deps: DependencyList): T {
  return useMemo(() => factory, deps);
}
