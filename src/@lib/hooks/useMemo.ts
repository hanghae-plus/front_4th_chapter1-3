import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T, // 메모이제이션을 할 값을 계산하는 함수
  _deps: DependencyList, // 의존성 배열: 값이 변경될 때, factory를 실행
  _equals = shallowEquals // 의존성 비교 함수: 기본값으로 얕은 비교를 사용
): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.
  // 1. 이전 의존성과 계산된 값을 저장할 ref를 생성
  const ref = useRef<{ deps: DependencyList; value: T } | null>(null);

  // 2. 현재 ref가 null이거나 의존성이 변경되었는지 확인
  if (ref.current == null || !_equals(_deps, ref.current.deps)) {
    // 3. 새로운 값을 계산하고 저장합니다
    // deps:  현재 의존성 배열을 저장하고 다음 렌더링에서 비교
    // factory: value에 factory 실행 결과를 저장해서 의존성이 변경되지 않을 때 재사용
    ref.current = { deps: _deps, value: factory() };
  }

  return ref.current.value;
}
