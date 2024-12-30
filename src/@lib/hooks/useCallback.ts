/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useMemo } from "./useMemo";

export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList,
) {
  // 보통 useCallback을 사용할 때 factory 함수를 전역 함수로 정의한 후 넣지 않음.
  // 그에 따라서 컴포넌트가 리렌더링 될 때마다 factory 함수가 생성 될 가능성이 높기 때문에 deps에 넣지 않음.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => factory, _deps);
}
