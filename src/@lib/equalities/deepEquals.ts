export function deepEquals<T>(objA: T, objB: T): boolean {
  // 기본타입일 때 비교 처리
  if (typeof objA !== typeof objB) {
    return false;
  }
  if (objA === objB) {
    return true;
  }

  // 객체가 베열이 아닌 것들을 걸러냄
  if (
    typeof objA !== "object" &&
    typeof objB !== "object" &&
    !Array.isArray(objA) &&
    !Array.isArray(objB)
  ) {
    return false;
  }

  //객체(배열)의 키(index) 개수 췍
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }

  //객체(배열)의 개수가 같으니 값이 같은지 비교
  for (const key of keysA) {
    if (typeof objA[key] === "object") {
      if (!deepEquals(objA[key], objB[key])) return false;
    } else {
      if (objA[key] !== objB[key]) {
        return false;
      }
    }
  }

  return true;
}
