export function deepEquals<T>(objA: T, objB: T): boolean {
  // 1. 기본 타입이거나 null인 경우 처리
  if (objA === objB) return true;

  if (
    typeof objA !== "object" ||
    typeof objB !== "object" ||
    objA === null ||
    objB === null
  ) {
    return false;
  }

  // 2. 둘 다 객체인 경우:
  //    - 배열인지 확인
  if (Array.isArray(objA) && Array.isArray(objB)) {
    return JSON.stringify(objA) === JSON.stringify(objB);
  }

  //    - 객체의 키 개수가 다른 경우 처리
  if (Object.keys(objA).length !== Object.keys(objB).length) {
    return false;
  }

  //    - 재귀적으로 각 속성에 대해 deepEquals 호출
  for (const key in objA) {
    if (typeof objA[key] === "object") {
      return deepEquals(objA[key], objB[key]);
    } else {
      if (objA[key] !== objB[key]) {
        return false;
      }
    }
  }

  return true;
}
