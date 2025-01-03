import { DependencyList } from "react";
import { useRef } from "./useRef";
import { shallowEquals } from "../equalities";

export function useMemo<T>(
  factory: () => T,
  deps: DependencyList,
  equals = shallowEquals,
): T {
  // 이전 의존성과 결과를 저장할 ref 생성
  const ref = useRef<{
    deps: DependencyList;
    value: T;
    initial: boolean;
  }>({
    deps: [],
    value: undefined as T,
    initial: true,
  });

  // 초기 렌더링이거나 의존성이 변경된 경우에만 factory 실행
  if (ref.current.initial || !equals(deps, ref.current.deps)) {
    ref.current.deps = deps;
    ref.current.value = factory();
    ref.current.initial = false;
  }

  return ref.current.value;
}
