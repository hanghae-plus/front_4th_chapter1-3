import { DependencyList } from "react";
import { useMemo } from "./useMemo";

export function useCallback<T extends (...args: unknown[]) => unknown>(
  factory: T,
  _deps: DependencyList,
): T {
  // useMemo를 사용하여 factory 함수를 메모이징
  return useMemo(() => factory as T, _deps);
}
