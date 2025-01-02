/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "./useMemo";
import { deepEquals } from "../equalities";

// 🎯 깊은 비교를 사용하여 값을 메모이제이션.
// 🎯 useMemo를 사용하되, 비교 함수로 deepEquals를 사용.
export function useDeepMemo<T>(
  factory: () => T,
  deps: React.DependencyList,
): T {
  return useMemo(factory, deps, deepEquals);
}
