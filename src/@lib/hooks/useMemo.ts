/* eslint-disable @typescript-eslint/no-unused-vars */
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import {useRef} from "./useRef.ts";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.
  const ref = useRef(0);
  const result = useRef(0);
  if (!_equals(ref.current, _deps)) {
    ref.current = _deps;
    result.current = factory();
  }
  return result.current;
}
