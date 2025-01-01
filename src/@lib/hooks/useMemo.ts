import { useRef } from "./useRef";
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 메모이제이션된 값과 의존성을 저장
  const cachedValue = useRef<T>();
  const cachedDeps = useRef<DependencyList>();

  // 이전 의존성과 현재 의존성을 비교
  if (!cachedDeps.current || !_equals(cachedDeps.current, _deps)) {
    // 의존성이 변경된 경우, 새로운 값을 계산하고 저장
    cachedDeps.current = _deps;
    cachedValue.current = factory();
  }

  // 메모이제이션된 값 반환
  return cachedValue.current!;
}
