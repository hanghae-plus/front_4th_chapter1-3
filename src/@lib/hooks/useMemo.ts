/* eslint-disable @typescript-eslint/no-unused-vars */
import { DependencyList, useRef } from "react";
import { shallowEquals } from "../equalities";
import { useRef as myRef } from "./useRef";

// 🎯 계산 비용이 높은 값을 메모이제이션.
export function useMemo<T>(factory: () => T, _deps: DependencyList, _equals = shallowEquals): T {
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const prevDeps = myRef<DependencyList | undefined>();
  const prevResult = myRef<T | undefined>();

  // 2. 현재 의존성과 이전 의존성 비교
  if (!_deps || !prevDeps.current || !_equals(prevDeps.current, _deps)) {
    // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
    prevDeps.current = _deps;
    prevResult.current = factory();
  }

  // 4. 메모이제이션된 값 반환
  return prevResult.current as T;
}
