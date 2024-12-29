/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList, useMemo } from "react";

export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList,
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedCallback = useMemo(() => factory, _deps);
  return memoizedCallback;
}
