/* eslint-disable react-hooks/exhaustive-deps */
import { DependencyList } from "react";
import { useMemo } from "./useMemo";

export function useCallback<
  T extends (...args: Parameters<T>) => ReturnType<T>,
>(factory: T, deps: DependencyList): T {
  return useMemo(() => factory, deps);
}
