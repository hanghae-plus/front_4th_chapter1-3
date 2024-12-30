/* eslint-disable @typescript-eslint/no-unused-vars */
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const memoizedRef = useRef<{ deps: DependencyList; value: T }>();

  // 2. 현재 의존성과 이전 의존성 비교
  if (!memoizedRef.current || !_equals(memoizedRef.current.deps, _deps)){
    memoizedRef.current = {
      // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
      value: factory(),
      deps: _deps,
    };
  }
  // 4. 메모이제이션된 값 반환
  return memoizedRef.current.value;
}
