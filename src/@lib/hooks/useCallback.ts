/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useMemo } from "./useMemo";

export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList,
) {
  // 직접 작성한 useMemo를 통해서 만들어보세요.
  // deps가 null일 경우 빈 배열로 대체
  const deps = _deps || [];

  return useMemo(() => {
    return factory;
  }, deps);
}
