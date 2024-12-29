export function deepEquals<T>(objA: T, objB: T): boolean {
  //1. 기본 타입이거나 null인 경우 처리

  if (objA === objB) return true;

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  //2. 둘 다 객체인 경우
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

  const Keys1 = Object.keys(objA);
  const Keys2 = Object.keys(objB);

  if (Keys1.length !== Keys2.length) {
    return false;
  }

  for (const key of Keys1) {
    if (!objB.hasOwnProperty(key) || !deepEquals(objA[key], objB[key])) {
      return false;
    }
  }
  return true;
}
