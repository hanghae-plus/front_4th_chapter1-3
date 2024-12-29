/**
 * 두 값의 깊은 비교를 수행하는 함수
 * @param objA
 * @param objB
 * @returns {boolean}
 */
export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) {
    return true;
  }
  if (objA == null || objB == null) {
    return false;
  }
  if (typeof objA !== "object" || typeof objB !== "object") {
    return false;
  }

  // 배열 비교
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }
    for (let i = 0; i < objA.length; i++) {
      if (!deepEquals(objA[i], objB[i])) {
        return false;
      }
    }
    return true;
  }

  // 객체 비교
  const keysA = Object.keys(objA) as Array<keyof T>;
  const keysB = Object.keys(objB) as Array<keyof T>;
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    if (!deepEquals(objA[key], objB[key])) {
      return false;
    }
  }

  return true;
}
