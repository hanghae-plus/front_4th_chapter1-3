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

  // 이전 의존성과 결과를 저장하는 ref
  const memoized = useRef<null | { _deps: DependencyList; value: T }>(null);

  // 의존성 변경된 경우 새값 생성
  if (!memoized.current || !_equals(_deps, memoized.current._deps)) {
    memoized.current = {
      _deps,
      value: factory(),
    };
  }

  //메모제이션된 값 반환
  return memoized.current.value;
}
