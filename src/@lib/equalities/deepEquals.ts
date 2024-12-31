// deepEquals 함수는 두 값의 깊은 비교를 수행합니다.

export function deepEquals<T>(objA: T, objB: T): boolean {
  // 1. 기본 타입이거나 null인 경우 처리
  if (Object.is(objA, objB)) {
    return true;
  }

  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  if (typeof objA !== "object" || typeof objB !== "object") {
    return false;
  }

  const keysA = Object.keys(objA as object);
  const keysB = Object.keys(objB as object);

  // 3. 객체의 키 개수가 다른 경우 처리
  if (keysA.length !== keysB.length) {
    return false;
  }

  // 4. 재귀적으로 deepEquals 호출하여 깊은 비교 수행
  for (const key of keysA) {
    if (
      !deepEquals(
        (objA as Record<string, unknown>)[key],
        (objB as Record<string, unknown>)[key],
      )
    ) {
      return false;
    }
  }

  return true;
}
