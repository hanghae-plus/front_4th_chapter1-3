/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { useMemo } from "./useMemo";

export function useCallback<T extends Function>(
  factory: T,
  _deps: React.DependencyList,
) {
  return useMemo(() => factory, _deps);
}
