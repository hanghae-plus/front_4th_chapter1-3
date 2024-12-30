/* eslint-disable @typescript-eslint/no-unused-vars */
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "../hooks/useRef"

export function useMemo<T>(
  factory: () => T, // 계산 함수
  _deps: DependencyList, // 의존성 배열
  _equals = shallowEquals, // 얕은 비교 연산 함수
): T {
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const ref = useRef<{ deps: DependencyList; value: T | null}>({
    deps: _deps,
    value: null
  });

  // 2. 현재 의존성과 이전 의존성 비교
  const isDepsChanged = !_equals(ref.current.deps, _deps);

  if (isDepsChanged) {
    // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
    ref.current.deps = _deps;
    ref.current.value = factory();
  }

  // 4. 메모이제이션된 값 반환
  return ref.current.value!;
}
