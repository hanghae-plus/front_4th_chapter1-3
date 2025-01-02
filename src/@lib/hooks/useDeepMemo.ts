/* eslint-disable react-hooks/exhaustive-deps */
import { DependencyList } from "react";
import { deepEquals } from "../equalities";
import { useMemo } from "./useMemo";

export function useDeepMemo<T>(factory: () => T, deps: DependencyList): T {
  return useMemo(factory, deps, deepEquals);
}
