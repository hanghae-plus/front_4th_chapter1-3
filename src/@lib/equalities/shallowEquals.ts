export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (objA === null && objB === null) {
    return objA === objB;
  }

  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }

    for (let index = 0; index < objA.length; index++) {
      if (objA[index] !== objB[index]) {
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

    for (const key of keysA) {
      if (
        (objA as Record<string, unknown>)[key] !==
        (objB as Record<string, unknown>)[key]
      ) {
        return false;
      }
    }
    return true;
  }

  return objA === objB;
}
