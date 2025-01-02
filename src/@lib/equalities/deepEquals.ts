export function deepEquals<T>(objA: T, objB: T): boolean {
  // 1. 참조가 같은 경우
  if (objA === objB) {
    return true;
  }

  // 2. null 또는 undefined 처리
  if (objA == null || objB == null) {
    return objA === objB;
  }

  // 3. 타입이 다른 경우
  if (typeof objA !== typeof objB) {
    return false;
  }

  // 4. 배열 처리
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }

    return objA.every((value, index) => deepEquals(value, objB[index]));
  }

  // 5. 일반 객체 처리
  if (typeof objA === "object" && typeof objB === "object") {
    const keysA = Object.keys(objA) as (keyof T)[];
    const keysB = Object.keys(objB) as (keyof T)[];

    // 키 개수 비교
    if (keysA.length !== keysB.length) {
      return false;
    }

    // 모든 키와 값을 재귀적으로 비교
    return keysA.every(
      (key) =>
        Object.prototype.hasOwnProperty.call(objB, key) &&
        deepEquals(objA[key], objB[key]),
    );
  }

  // 6. 나머지 경우
  return false;
}
