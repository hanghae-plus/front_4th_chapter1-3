import { DependencyList } from "react";
import { useMemo } from "./useMemo";

export function useCallback<T extends (...args: any[]) => any>(
  factory: T,
  deps: DependencyList
): T {
  // useMemo 훅을 사용하여 콜백 함수를 메모이제이션
  return useMemo(() => factory, deps);
}
