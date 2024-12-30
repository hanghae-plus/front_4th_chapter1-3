import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const prevDepsRef = useRef<DependencyList | null>(null);
  const prevValueRef = useRef<T | null>(null);

  // 2. 현재 의존성과 이전 의존성 비교 (얕은 비교)
  if (!(prevDepsRef.current && _equals(prevDepsRef.current, _deps))) {
    //3. 첫 렌더링이거나 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
    prevValueRef.current = factory();
    prevDepsRef.current = _deps;
  }

  // 4. 메모이제이션된 값 반환
  return prevValueRef.current as T;
}
