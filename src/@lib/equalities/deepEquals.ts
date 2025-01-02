export function deepEquals<T>(objA: T, objB: T): boolean {
  // 원시타입의 값이 동일하거나 기존 객체의 주소값이 바뀌지 않은 경우
  if (objA === objB) {
    return true;
  }

  // null인 경우
  if (objA === null || objB === null) {
    return objA === objB;
  }

  // 나머지 원시값들 처리
  if (typeof objA !== "object" || typeof objB !== "object") {
    return objA === objB;
  }

  const objAKeys = Object.keys(objA);
  const objBKeys = Object.keys(objB);

  if (objAKeys.length !== objBKeys.length) {
    return false;
  }

  for (const key of objAKeys) {
    const valueA = Reflect.get(objA, key);
    const valueB = Reflect.get(objB, key);
    if (!deepEquals(valueA, valueB)) {
      return false;
    }
  }

  return true;
}
