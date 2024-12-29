/* eslint-disable @typescript-eslint/no-unused-vars */
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.
  // memo 초기값 설정
  const ref = useRef<{
    deps: DependencyList;
    value: T;
    initialized: boolean;
  }>({ deps: [], value: undefined as T, initialized: false });

  //memo 의존성 검사
  if (!ref.current.initialized || !_equals(_deps, ref.current.deps)) {
    ref.current.deps = _deps;
    ref.current.value = factory();
    ref.current.initialized = true;
  }
  return ref.current.value;
}
