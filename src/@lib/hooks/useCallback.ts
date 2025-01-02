/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useMemo } from "./useMemo";

/**
 * 메모이제이션된 콜백 함수를 반환하는 훅
 * @param callback 메모이제이션할 콜백 함수
 * @param _deps 의존성 배열 - 이 배열의 값이 변경되면 callback이 다시 생성됨
 * @returns 메모이제이션된 콜백 함수
 */
export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList,
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => factory, _deps);
}
