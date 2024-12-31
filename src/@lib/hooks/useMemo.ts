import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 직접 작성한 useRef를 통해서 만들어보세요! 이게 제일 중요합니다.
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  // 2. 현재 의존성과 이전 의존성 비교
  // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
  // 4. 메모이제이션된 값 반환

  if (!_deps || !Array.isArray(_deps)) {
    throw new Error("The dependency list (_deps) must be an array.");
  }

  const prevPropsRef = useRef<DependencyList | null>(null); //의존성 배열 저장, 초기값은 null
  const prevProps = useRef<T | null>(null); // 이전 생성된 값 저장, 초기값은 null

  // 현재 의존성과 이전 의존성 비교
  if (!prevPropsRef || !_equals(prevPropsRef.current, _deps)) {
    prevPropsRef.current = _deps;
    prevProps.current = factory();
  }

  return prevProps.current!;
}
