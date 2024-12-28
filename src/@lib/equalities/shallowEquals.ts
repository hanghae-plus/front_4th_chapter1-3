// 🎯 두 값의 얕은 비교를 수행.
export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 1. 두 값이 동일한 경우 (동일한 참조인 경우)
  if (objA === objB) {
    return true;
  }

  // 2. 하나라도 기본 타입(primitive type)이거나 null인 경우
  if (!objA || !objB || typeof objA !== "object" || typeof objB !== "object") {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // 3. 객체의 키 개수가 다른 경우
  if (keysA.length !== keysB.length) {
    return false;
  }

  // 4. 순회하며 객체의 속성(key-value) 비교
  return keysA.every((key) => objA[key as keyof T] === objB[key as keyof T]);
}
