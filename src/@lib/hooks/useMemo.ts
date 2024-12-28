/* eslint-disable @typescript-eslint/no-unused-vars */
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const isInitialized = useRef<boolean>(false);
  const memoizedFactory = useRef<T | null>(null);
  const memoizedDeps = useRef<DependencyList | null>(null);

  if (!(isInitialized.current && _equals(memoizedDeps.current, _deps))) {
    isInitialized.current = true;
    memoizedFactory.current = factory();
    memoizedDeps.current = _deps;
  }

  return memoizedFactory.current as T;
}
