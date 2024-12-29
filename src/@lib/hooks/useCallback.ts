/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useRef } from "./useRef";
import { shallowEquals } from "../equalities";

export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList
) {
  const ref = useRef<null | { deps: DependencyList; factory: T }>(null);

  // deps에 변화가 생기면 함수을 리턴
  if (!ref.current || !shallowEquals(_deps, ref.current.deps)) {
    ref.current = {
      deps: _deps,
      factory,
    };
  }

  return ref.current.factory;
}
