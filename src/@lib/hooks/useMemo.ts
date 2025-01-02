import { useRef } from "react";

export function useMemo<T>(
  factory: () => T,
  deps: unknown[],
  equals: (a: unknown[], b: unknown[]) => boolean = (a, b) =>
    a.every((v, i) => v === b[i]),
): T {
  // 이전 의존성 저장
  const previousDepsRef = useRef<unknown[] | null>(null);
  // 메모이제이션된 값 저장
  const memoizedValueRef = useRef<T | null>(null);

  // 의존성 변경 감지
  const dependenciesChanged =
    !previousDepsRef.current || !equals(previousDepsRef.current, deps);

  if (dependenciesChanged) {
    // 의존성이 변경되었을 경우 재계산
    memoizedValueRef.current = factory();
    previousDepsRef.current = deps;
  }

  return memoizedValueRef.current as T;
}
