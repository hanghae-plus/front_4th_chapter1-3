export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === null && objB === null) {
    return objA === objB;
  }

  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }
    for (let index = 0; index < objA.length; index++) {
      if (!deepEquals(objA[index], objB[index])) {
        return false;
      }
    }
    return true;
  }

  if (typeof objA === "object" && typeof objB === "object") {
    const keysA = Object.keys(objA as object);
    const keysB = Object.keys(objB as object);

    if (keysA.length !== keysB.length) {
      return false;
    }
    for (let i = 0; i < keysA.length; i++) {
      const key = keysA[i];

      if (!(key in (objB as object))) {
        return false;
      }

      const isEqual = deepEquals(
        (objA as Record<string, unknown>)[key],
        (objB as Record<string, unknown>)[key]
      );

      if (!isEqual) {
        return false;
      }
    }

    return true;
  }

  return objA === objB;
}
