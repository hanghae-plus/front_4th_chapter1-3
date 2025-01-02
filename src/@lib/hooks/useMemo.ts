/* eslint-disable @typescript-eslint/no-unused-vars */
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef.ts";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const resultRef = useRef<T | null>(null);
  const dependencyRef = useRef<DependencyList>([]);

  if (!_equals(dependencyRef.current, _deps)) {
    resultRef.current = factory();
    dependencyRef.current = [..._deps];
  }

  return resultRef.current as T;
}
