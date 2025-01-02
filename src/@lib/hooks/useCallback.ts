/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { useMemo } from "./useMemo";

export function useCallback<T extends Function, D extends []>(
  factory: T,
  _deps: D,
) {
  return useMemo(() => factory, _deps);
}
