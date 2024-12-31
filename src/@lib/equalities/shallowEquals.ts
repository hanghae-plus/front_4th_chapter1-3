export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) {
    return true;
  }
  if (objA == null || objB == null) {
    return false;
  }
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }
    return objA.every((_, index) => objA[index] === objB[index]);
  }
  if (typeof objA === "object" && typeof objB === "object") {
    const keysA = Object.keys(objA as object);
    const keysB = Object.keys(objB as object);
    if (keysA.length !== keysB.length) {
      return false;
    }
    return keysA.every(
      (item) =>
        Object.prototype.hasOwnProperty.call(objB, item) &&
        (objA as { [key: string]: unknown })[item] ===
          (objB as { [key: string]: unknown })[item],
    );
  }
  return objA === objB;
}
