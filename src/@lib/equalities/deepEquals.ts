export function deepEquals<T>(objA: T, objB: T): boolean {
  // 참조 비교
  if (objA === objB) return true;

  // 타입 체크
  if (typeof objA !== "object" || typeof objB !== "object") return false;

  // null 체크
  if (objA === null || objB === null) return false;

  // 원시 타입이면 값 비교
  if (typeof objA !== "object") return objA === objB;

  // 배열 처리
  if (Array.isArray(objA) && Array.isArray(objB)) {
    // 길이가 다르면 false
    if (objA.length !== objB.length) return false;

    // 각 요소 비교 -> 재귀 호출
    return objA.every((item, index) => deepEquals(item, objB[index]));
  }

  // 일반 객체 처리
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // 키 개수가 다르면 false
  if (keysA.length !== keysB.length) return false;

  // 각 키 비교 -> 재귀 호출
  return keysA.every(
    (key) =>
      // objB에 키가 없으면 false
      Object.prototype.hasOwnProperty.call(objB, key) &&
      // 각 키의 값 비교 -> 재귀 호출
      deepEquals(objA[key as keyof T], objB[key as keyof T])
  );
}
