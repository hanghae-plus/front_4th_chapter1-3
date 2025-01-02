import { DependencyList } from "react";
import { useRef } from "./useRef";
import { shallowEquals } from "../equalities";

type MemoState<T> = {
  deps: DependencyList;
  value: T;
};

type CompareFn = (a: DependencyList, b: DependencyList) => boolean;

export function useMemo<T>(
  factory: () => T,
  deps: DependencyList,
  equals: CompareFn = shallowEquals,
): T {
  // 1. 이전 상태를 저장할 ref 생성
  const ref = useRef<MemoState<T> | null>(null);

  // 2. 현재 의존성과 이전 의존성을 비교
  if (!ref.current || !equals(deps, ref.current.deps)) {
    // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
    ref.current = {
      deps,
      value: factory(),
    };
  }

  // 4. 메모이제이션된 값 반환
  return ref.current.value;
}
