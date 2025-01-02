import { DependencyList } from "react";
import { deepEquals } from "../equalities";
import { useMemo } from "./useMemo";

export function useDeepMemo<T>(factory: () => T, _deps: DependencyList): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, _deps, deepEquals);
}
