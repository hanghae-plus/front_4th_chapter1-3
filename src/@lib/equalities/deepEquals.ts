export function deepEquals<T>(objA: T, objB: T): boolean {
  // primitive
  if (objA === objB) {
    return true;
  }

  // uncomparable
  if (
    objA === null ||
    objB === null ||
    typeof objA !== "object" ||
    typeof objB !== "object"
  ) {
    return false;
  }

  // array
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }
    return objA.every((itemA, index) => deepEquals(itemA, objB[index]));
  }

  // Object Literal
  if (!Array.isArray(objA) && !Array.isArray(objB)) {
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    return keysA.every((key) =>
      deepEquals(objA[key as keyof T], objB[key as keyof T]),
    );
  }

  return false;
}
