import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  // 2. 현재 의존성과 이전 의존성 비교
  // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
  // 4. 메모이제이션된 값 반환

  const ref = useRef<null | { value: T; _deps: DependencyList | undefined }>(
    null,
  );

  if (!ref.current || !_equals(_deps, ref.current._deps)) {
    ref.current = {
      _deps,
      value: factory(),
    };
  }

  return ref.current.value;
}
