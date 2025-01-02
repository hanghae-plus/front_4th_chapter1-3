import { DependencyList } from "react";
import { useMemo } from "./useMemo";

export function useCallback<
  T extends (...args: Parameters<T>) => ReturnType<T>,
>(callback: T, deps: DependencyList): T {
  return useMemo(() => callback, deps);
}
