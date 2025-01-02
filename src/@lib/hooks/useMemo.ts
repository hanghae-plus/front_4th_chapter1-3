import { DependencyList } from "react";
import { useRef } from "./useRef"; // 이전에 구현한 useRef를 가져옵니다.
import { shallowEquals } from "../equalities"; // 얕은 비교 함수입니다.

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals, // 기본 비교 함수는 얕은 비교입니다.
): T {
  // factory: memoized 값을 생성, 계산
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const ref = useRef<{ deps: DependencyList | undefined; result: T }>({
    deps: undefined,
    result: undefined as unknown as T,
  });

  // 2. 현재 의존성과 이전 의존성 비교
  const hasChanged = !ref.current.deps || !_equals(ref.current.deps, _deps);

  if (hasChanged) {
    // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
    ref.current.result = factory();
    ref.current.deps = _deps;
  }

  // 4. 메모이제이션된 값 반환
  return ref.current.result;
}
