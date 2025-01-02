export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) {
    return true;
  }

  if (
    typeof objA !== "object" ||
    objA == null ||
    typeof objB !== "object" ||
    objB == null
  ) {
    return false;
  }

  if (Object.keys(objA).length !== Object.keys(objB).length) {
    return false;
  }

  for (const key in objA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) {
      return false;
    }

    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
}
