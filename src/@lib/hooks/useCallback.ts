/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */

import { DependencyList } from "react";
import { useMemo } from "./useMemo";
export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList,
) {
  const refactory = useMemo(() => factory, _deps);

  return refactory as T;
}
