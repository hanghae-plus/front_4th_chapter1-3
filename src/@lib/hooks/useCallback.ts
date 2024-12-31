/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useMemo } from "./useMemo";

// useCallback의 역할: 리렌더링시에도 함수의 참조를 유지하는 것
// useMemo를 활용하라네?
// _deps가 바뀌면? 함수를 재생성
// _deps가 안바뀌면? 기존의 함수 리턴

export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList,
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const factoryMemo = useMemo(() => factory, _deps);
  return factoryMemo;
}
