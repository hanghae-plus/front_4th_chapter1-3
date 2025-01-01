import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  deps: DependencyList,
  equals = shallowEquals
): T {
  const state = useRef<{
    deps: DependencyList;
    value: T;
    hasValue: boolean; // 초기화 상태 추가 (2번 호출되는 이슈 방지)
  }>({
    deps,
    value: undefined as T,
    hasValue: false,
  });

  // 초기화 상태가 아니거나 의존성이 변경된 경우에만 계산
  // 이전 props와 현재 props를 얕은 비교 후 다르면 계산
  if (!state.current.hasValue || !equals(state.current.deps, deps)) {
    state.current = {
      deps,
      value: factory(),
      hasValue: true,
    };
  }

  return state.current.value;
}
