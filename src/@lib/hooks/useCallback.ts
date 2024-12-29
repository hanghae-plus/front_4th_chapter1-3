/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useMemo } from "./useMemo";

// 함수를 기억하고 반환
export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList,
) {
  return useMemo(() => factory, _deps);
}
