/* eslint-disable @typescript-eslint/no-unused-vars */
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef.ts";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const memoizedRef = useRef<{ deps: DependencyList; value: T } | null>(null);
  // 2. 현재 의존성과 이전 의존성 비교
  const prevDeps = memoizedRef.current?.deps;
  if (prevDeps && _equals(prevDeps, _deps)) {
    return memoizedRef.current!.value;
  }
  // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
  const newValue = factory();
  memoizedRef.current = { deps: _deps, value: newValue };
  // 4. 메모이제이션된 값 반환

  // 구현을 완성해주세요.

  return newValue;
}
