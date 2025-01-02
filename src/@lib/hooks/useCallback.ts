/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useMemo } from "./useMemo";

export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList,
) {
  // 직접 작성한 useMemo를 통해서 만들어보세요.
  // 함수와 의존성 배열을 인자로 받고, 반환 값을 메모이제이션된 함수
  return useMemo(() => factory, _deps);
}
