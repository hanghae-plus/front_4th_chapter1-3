import { DependencyList } from "react";
import { useMemo } from ".";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCallback<T extends (...args: any[]) => any>(
  factory: T,
  _deps: DependencyList,
): T {
  return useMemo(() => factory, _deps) as T;
}
