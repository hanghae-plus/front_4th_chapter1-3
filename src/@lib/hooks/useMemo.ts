import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

interface MemoizedValue<T> {
  value: T;
  deps: DependencyList;
}

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals
): T {
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const memoizedRef = useRef<MemoizedValue<T> | undefined>(undefined);

  // 2. 현재 의존성과 이전 의존성 비교
  const depsChanged =
    !memoizedRef.current || !_equals(memoizedRef.current.deps, _deps);

  // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
  if (depsChanged) {
    memoizedRef.current = {
      value: factory(),
      deps: _deps,
    };
  }

  // 4. 메모이제이션된 값 반환
  if (!memoizedRef.current) {
    throw new Error("memoizedRef.current is undefined");
  }

  return memoizedRef.current.value as T;
}
