import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

// factory: 메모이제이션을 할 값
// deps: 메모이제이션을 하고 다음 렌더링에서 비교하는 의존성 배열
// equals: 메모이제이션을 하고 다음 렌더링에서 비교하는 함수

export function useMemo<T>(
  factory: () => T,
  deps: DependencyList,
  equals = shallowEquals
): T {
  // 1. 이전 의존성과 계산된 값을 저장하는 ref를 생성
  const ref = useRef<{ deps: DependencyList; value: T } | null>(null);

  // 2. 현재 ref가 null이거나 의존성이 변경되었는지 확인
  if (ref.current == null || !equals(deps, ref.current.deps)) {
    // 3. 새로운 값을 계산하고 저장
    ref.current = { deps: deps, value: factory() };
  }

  return ref.current.value;
}
