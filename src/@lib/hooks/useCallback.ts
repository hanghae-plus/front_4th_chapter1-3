/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useMemo } from "./useMemo";

export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList
) {
  return useMemo(() => factory, _deps, shallowEquals);
}

// useCallback은 콜백 함수를 메모이제이션하는 함수
// useMemo는 값을 메모이제이션하는 함수

// const memoizedCallback = useCallback(callback, deps);

// 위 코드는 내부적으로 아래와 같이 동작
// const memoizedCallback = useMemo(() => callback, deps);
