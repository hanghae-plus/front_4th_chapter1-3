/* eslint-disable @typescript-eslint/no-unused-vars */
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

// useMemo 훅은 계산 비용이 높은 값을 메모이제이션합니다.
export function useMemo<T>(
  factory: () => T, 
  _deps: DependencyList, 
  _equals = shallowEquals,
): T {
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  // 2. 현재 의존성과 이전 의존성 비교
  // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
  // 4. 메모이제이션된 값 반환

  const memoized = useRef<{
    deps: DependencyList | null;
    value: T | null;
  }>({
    deps: null,
    value: null,
  });

  const equals = !memoized.current.deps || !_equals(memoized.current.deps, _deps);

  if (equals) {
    memoized.current.value = factory();
    memoized.current.deps = _deps;
  }
  
  return memoized.current.value as T;
}
