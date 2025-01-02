/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef.ts";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.
  const ref = useRef<{ value: T; deps: DependencyList } | null>(null);

  // 초기 렌더링이거나 deps가 변경되었는지 확인
  if (ref.current == null || !_equals(ref.current.deps, _deps)) {
    // 새로운 값을 계산하고 업데이트
    ref.current = {
      value: factory(),
      deps: _deps,
    };
  }

  // 캐싱된 값을 반환
  return ref.current.value;
}
