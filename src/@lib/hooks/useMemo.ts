import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

// 컴포넌트가 (리)렌더링된다 -> useMemo가 실행된다.
// _deps가 바뀌었는지 비교한다. by _equals
// _deps가 바뀌었는지 어떻게 아는가?
// -> 인자로 들어온 _deps와 기존에 어딘가에 보관해 둔 _deps를 비교한다.
// -> 어디에 보관할건데? : useRef
// 바뀌었으면 factory()를 리턴한다.
// 안바뀌었으면 기존에 계산된 값을 리턴한다.
// -> 기존에 계산된 값은 어디다가 보관하는가? : useRef

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const depsRef = useRef<DependencyList | null>(null);
  const computedValueRef = useRef<T | null>(null);

  if (computedValueRef.current === null || depsRef.current === null) {
    computedValueRef.current = factory();
    depsRef.current = _deps;
    return computedValueRef.current;
  }

  if (_equals(_deps, depsRef.current)) {
    return computedValueRef.current;
  }

  depsRef.current = _deps;
  computedValueRef.current = factory();

  return computedValueRef.current;
}
