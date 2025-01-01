// 함수는 두 값의 얕은 비교를 수행
export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) {
    return true;
  }

  if (objA === null || objB === null) {
    return objA === objB;
  }

  if (typeof objA !== "object" || typeof objB !== "object") {
    return objA === objB;
  }

  const objAKeys = Object.keys(objA);
  const objBKeys = Object.keys(objB);

  if (objAKeys.length !== objBKeys.length) return false;

  for (const key of objAKeys) {
    // Check: key 타업 단언
    if (
      !Object.prototype.hasOwnProperty.call(objB, key) ||
      objA[key as keyof typeof objA] !== objB[key as keyof typeof objB]
    ) {
      return false;
    }
  }
  return true;
}
