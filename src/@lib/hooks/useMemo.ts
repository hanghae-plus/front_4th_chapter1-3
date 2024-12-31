/* eslint-disable @typescript-eslint/no-unused-vars */
import { DependencyList } from 'react';
import { shallowEquals } from '../equalities';
import { useRef } from './useRef';
import nullGuard from '../type/utils/nullGuard';

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals
): T {
  const ref = useRef<{ memoizedValue: T | null; deps: DependencyList }>({
    memoizedValue: null,
    deps: [] as DependencyList,
  });

  if (ref.current.deps.length === 0 || !_equals(ref.current.deps, _deps)) {
    ref.current.memoizedValue = factory();
    ref.current.deps = _deps;
  }

  if (nullGuard(ref.current.memoizedValue)) {
    return ref.current.memoizedValue;
  }

  throw new Error(
    '메모이즈가 정상적으로 되지 않았습니다 : factory 함수에서 null을 반환하면 안됩니다.'
  );
}
