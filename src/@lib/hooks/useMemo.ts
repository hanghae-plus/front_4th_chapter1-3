import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 초기값을 null로 설정하여 의도적으로 "값이 없음"을 명시
  const ref = useRef<{
    value: T | null;
    deps: DependencyList;
  }>({
    value: null,
    deps: [],
  });

  // 의존성 배열이 변경된 경우 또는 초기화가 필요한 경우에만 factory 실행
  if (ref.current.value === null || !_equals(ref.current.deps, _deps)) {
    ref.current.value = factory();
    ref.current.deps = _deps;
  }

  if (ref.current.value === null) {
    throw new Error("useMemo: 값이 초기화되지 않았습니다.");
  }

  return ref.current.value;
}
