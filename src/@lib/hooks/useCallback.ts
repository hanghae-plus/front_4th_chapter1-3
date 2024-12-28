/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useMemo } from "./useMemo";

// useCallback 훅은 메모이제이션된 콜백 함수를 반환합니다.
export function useCallback<T extends Function>(
  callback: T,
  deps: DependencyList,
  equals = shallowEquals,
): T {
  // NOTE: useMemo를 사용하여 콜백 함수를 메모이제이션
  return useMemo(() => callback, deps, equals);
}
