export function deepEquals<T>(objA: T, objB: T): boolean {
  if (typeof objA !== typeof objB) {
    return false;
  }

  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }
    const sortedA = [...objA].sort();
    const sortedB = [...objB].sort();
    return sortedA.every((item, index) => deepEquals(item, sortedB[index]));
  }

  if (
    typeof objA === "object" &&
    typeof objB === "object" &&
    objA !== null &&
    objB !== null
  ) {
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    return keysA.every(
      (key) =>
        Object.prototype.hasOwnProperty.call(objB, key) &&
        deepEquals(objA[key as keyof T], objB[key as keyof T]),
    );
  }

  return objA === objB;
}
