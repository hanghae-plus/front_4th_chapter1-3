export function deepEquals<T>(objA: T, objB: T): boolean {
  // 1. 기본 타입이거나 null인 경우 처리
  if (objA === objB) {
    return true;
  }

  if (
    objA == null ||
    objB == null ||
    typeof objA !== "object" ||
    typeof objB !== "object"
  ) {
    return false;
  }

  // 2. 둘 다 객체인 경우:
  //    - 배열인지 확인
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }
    return objA.every((value, index) => deepEquals(value, objB[index]));
  }

  //    - 객체의 키 개수가 다른 경우 처리
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }
  //    - 재귀적으로 각 속성에 대해 deepEquals 호출
  return keysA.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(objB, key) &&
      deepEquals(
        (objA as Record<string, unknown>)[key],
        (objB as Record<string, unknown>)[key],
      ),
  );
}
