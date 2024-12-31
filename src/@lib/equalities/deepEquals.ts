export function deepEquals<T>(objA: T, objB: T): boolean {
  // 기본 타입 값 비교
  if (objA === objB) {
    return true;
  }

  // 둘 중 하나라도 객체가 아닌 경우 처리
  if (typeof objA !== "object" || typeof objB !== "object") {
    return false;
  }

  // 배열인 경우
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }
    return objA.every((value, index) => deepEquals(value, objB[index]));
  }

  // 객체의 키 개수가 다른 경우
  if (
    objA == null ||
    objB == null ||
    Object.keys(objA).length !== Object.keys(objB).length
  ) {
    return false;
  }

  // 둘 다 객체인 경우
  if (typeof objA === "object" && typeof objB === "object") {
    for (const key in objA) {
      if (objA == null || objB == null || !deepEquals(objA[key], objB[key])) {
        return false;
      }
    }
    return true;
  }

  return false;
}
