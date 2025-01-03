/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useMemo } from "./useMemo";
import { shallowEquals } from "../equalities";

export function useCallback<T extends Function>(
  callback: T,
  deps: DependencyList,
  equals = shallowEquals,
): T {
  // useMemo를 사용하여 의존성이 변경될 때만 새로운 함수를 생성
  return useMemo(() => callback, deps, equals);
}
