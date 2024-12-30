/* eslint-disable @typescript-eslint/no-unused-vars */
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "../hooks/useRef"

export function useMemo<T>(
  factory: () => T, // 계산 함수
  _deps: DependencyList, // 의존성 배열
  _equals = shallowEquals, // 얕은 비교 연산 함수
): T {
  // 1. 이전 의존성을 저장할 ref 생성
  const prevDeps = useRef<DependencyList | null>(null); // 이전 의존성 저장

  // 1. 계산된 값의 결과 저장할 ref 생성
  const value = useRef<T | null>(null); 

  // 2. 현재 의존성과 이전 의존성 비교
  const isDepsChanged = !prevDeps.current || !_equals(prevDeps.current, _deps);

  if (isDepsChanged) {
    // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
    prevDeps.current = _deps;  // 이전 의존성 업데이트
    value.current = factory(); // 새로 계산된 값 저장
  }

  // 4. 메모이제이션된 값 반환
  return value.current !== null ? value.current : factory();
}
