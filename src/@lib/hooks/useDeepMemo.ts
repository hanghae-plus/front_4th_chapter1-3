/* eslint-disable react-hooks/exhaustive-deps */
import { DependencyList } from 'react';
import { useMemo } from './useMemo';
import { deepEquals } from '../equalities';

export function useDeepMemo<T>(factory: () => T, deps: DependencyList): T {
  const memoized = useMemo(factory, deps, deepEquals);

  return memoized;
}
