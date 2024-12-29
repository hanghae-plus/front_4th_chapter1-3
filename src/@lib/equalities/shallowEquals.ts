/**
 * 두 값의 얕은 비교를 수행하는 함수
 * @param objA
 * @param objB
 * @returns {boolean}
 */
export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (objA === objB) {
    return true;
  }

  // null, undefined 처리
  if (objA == null || objB == null) {
    return false;
  }

  // 둘 중 하나라도 원시 타입인 경우 false
  if (typeof objA !== "object" || typeof objB !== "object") {
    return false;
  }

  // 배열 비교
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }
    for (let i = 0; i < objA.length; i++) {
      if (objA[i] !== objB[i]) {
        return false;
      }
    }
    return true;
  }

  // 객체 비교
  const keysA = Object.keys(objA) as Array<keyof T>;
  const keysB = Object.keys(objB) as Array<keyof T>;
  if (
    keysA.length !== keysB.length ||
    keysA.some((key) => !keysB.includes(key))
  ) {
    return false;
  }
  for (const key of keysA) {
    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
}
