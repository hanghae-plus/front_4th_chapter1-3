export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (typeof objA !== "object" || typeof objB !== "object") {
    return false;
  }

  if (objA === null || objB === null) {
    return false;
  }

  // 객체인 경우 참조가 다르더라도 키-값이 같으면 true (주의: 1 depth만)
  const objAKeys = Object.keys(objA);
  const objBKeys = Object.keys(objB);

  if (objAKeys.length !== objBKeys.length) {
    return false;
  }

  for (let i = 0; i < objAKeys.length; i++) {
    const key = objAKeys[i];
    if (
      !Object.prototype.hasOwnProperty.call(objB, key) ||
      !Object.is(
        (objA as Record<string, unknown>)[key],
        (objB as Record<string, unknown>)[key],
      )
    ) {
      return false;
    }
  }

  return true;
}
