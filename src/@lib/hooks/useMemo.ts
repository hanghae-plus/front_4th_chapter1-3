/* eslint-disable @typescript-eslint/no-unused-vars */
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 이전 의존성과 결과를 저장할 ref 생성
  const ref = useRef<{ deps: DependencyList | null; value: T | null }>({
    deps: null,
    value: null,
  });

  // 현재 의존성과 이전 의존성 비교해서 값 업데이트
  if (ref.current.deps === null || !_equals(ref.current.deps, _deps)) {
    ref.current.deps = _deps;
    ref.current.value = factory();
  }

  // 메모이제이션된 값 반환
  return ref.current.value as T;
}
