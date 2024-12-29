import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

// Q: useMemo는 Object.is로 비교하는 것으로 알고 있는데 과제에서는 왜 직접구현한 shallowEquals를 사용해서 비교하는가?
export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.
  // 이 ref가 다시 호출되어서 factory가 호출됨
  const value = useRef<T | null>(null);
  const deps = useRef(_deps);

  if (value.current === null || !_equals(deps.current, _deps)) {
    value.current = factory();
    deps.current = _deps;
  }
  return value.current;
}
