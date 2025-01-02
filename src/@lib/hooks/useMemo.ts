import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

/**
 * 메모이제이션된 값을 반환하는 훅
 * @param factory 메모이제이션할 값을 생성하는 함수
 * @param _deps 의존성 배열 - 값이 변경되면 factory가 재실행됨
 * @param _equals 값 비교 함수
 * @returns {T} 메모이제이션된 값
 * @throws {Error} factory 실행 결과가 null일 경우 에러 발생
 */
export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // deps가 빈 배열일 경우를 고려하여 initialized 변수로 deps 초기화 여부를 확인
  const ref = useRef<{
    value: T | null;
    deps: DependencyList;
    initialized: boolean;
  }>({
    value: null,
    deps: [],
    initialized: false,
  });

  // 컴포넌트가 마운트되는 시점에 factory 실행
  if (!ref.current.initialized || !_equals(_deps, ref.current?.deps)) {
    ref.current.value = factory();
    ref.current.deps = _deps;
    ref.current.initialized = true;
  }

  if (ref.current.value === null) {
    throw new Error("useMemo: value가 null입니다.");
  }

  return ref.current.value;
}
