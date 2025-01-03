export function deepEquals<T>(objA: T, objB: T): boolean {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (typeof objA !== "object" || typeof objB !== "object") {
    return false;
  }

  if (objA === null || objB === null) {
    return false;
  }

  const objAKeys = Object.keys(objA);
  const objBKeys = Object.keys(objB);

  if (objAKeys.length !== objBKeys.length) {
    return false;
  }

  for (let i = 0; i < objAKeys.length; i++) {
    const key = objAKeys[i];
    if (
      !Object.prototype.hasOwnProperty.call(objB, key) ||
      !deepEquals(
        (objA as Record<string, unknown>)[key],
        (objB as Record<string, unknown>)[key],
      )
    ) {
      return false;
    }
  }

  return true;
}
