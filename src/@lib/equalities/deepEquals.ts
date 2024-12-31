// 🎯 두 값의 깊은 비교를 수행.
export function deepEquals<T>(objA: T, objB: T): boolean {
  // 1. 기본 타입(primitive type)이거나 null인 경우
  if (
    typeof objA !== "object" ||
    typeof objB !== "object" ||
    objA === null ||
    objB === null
  ) {
    return Object.is(objA, objB);
  }

  // 2. 객체 타입(object type)인 경우
  const isArrayA = Array.isArray(objA);
  const isArrayB = Array.isArray(objB);

  // 하나는 배열, 다른 하나는 객체인 경우
  if (isArrayA !== isArrayB) {
    return false;
  }

  // 2.1. 배열인 경우
  if (isArrayA && isArrayB) {
    // 배열의 길이가 다른 경우
    if (objA.length !== objB.length) {
      return false;
    }

    // 배열의 각 요소에 대해 재귀적으로 호출
    return objA.every((valueA, idx) => deepEquals(valueA, objB[idx]));
  }

  // 2.2. 두 값이 객체(object, key-value)인 경우
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // 객체의 키 개수가 다른 경우
  if (keysA.length !== keysB.length) {
    return false;
  }

  // 객체의 각 속성(key-value)에 대해 재귀적으로 호출
  return keysA.every((key) =>
    deepEquals(objA[key as keyof T], objB[key as keyof T]),
  );
}
